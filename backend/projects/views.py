from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .filters import IssueFilter
from django.db.models import Q
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdminOrReadOnly, IsAdminUser, IsAdminOrStaffUser
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.text import slugify
from django.utils.crypto import get_random_string
from . import serializers
from .models import *


# Create your views here.
class UserViewSet(ModelViewSet):
    http_method_names = ['get', 'patch', 'delete']
    serializer_class = serializers.ComprehensiveUserSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"

    queryset = User.objects.all()


class ProjectCategoryViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"
    serializer_class = serializers.ProjectCategorySerializer
    permission_classes = [IsAdminOrStaffUser]

    queryset = ProjectCategory.objects.all()


class ProjectTypeViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"

    serializer_class = serializers.ProjectTypeSerializer
    permission_classes = [IsAdminOrStaffUser]

    queryset = ProjectType.objects.all()


class ProjectStatusViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"

    serializer_class = serializers.ProjectStatusSerializer
    permission_classes = [IsAdminOrStaffUser]

    queryset = ProjectStatus.objects.all()


class ProjectLabelsViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"

    serializer_class = serializers.ProjectLabelsSerializer
    permission_classes = [IsAdminOrStaffUser]

    queryset = ProjectLabels.objects.all()


class ProjectSlackWebhookViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"

    serializer_class = serializers.ProjectSlackWebhookSerializer
    permission_classes = [IsAdminOrStaffUser]

    queryset = ProjectSlackWebhook.objects.all()


class GlobalSlackConfigViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']
    serializer_class = serializers.GlobalSlackConfigSerializer
    permission_classes = [IsAdminOrStaffUser]
    queryset = GlobalSlackConfig.objects.all()


class ProjectViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name', 'slug', 'assignees__id', 'project_lead__username', 'company__company_name',
                        'category__category']

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH', 'DELETE']:
            return serializers.CreateProjectSerializer
        return serializers.ProjectSerializer

    def get_permissions(self):
        if self.request.method in ['POST', 'PATCH', 'DELETE']:
            return [IsAdminOrStaffUser()]
        return [IsAuthenticated()]

    def get_serializer_context(self):
        return {'assignees': self.request.user.id}

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Project.objects.prefetch_related('assignees').prefetch_related('project_lead').select_related(
                'slack_webhook').select_related(
                'company').select_related('category').distinct()
        return Project.objects.filter(
            Q(project_lead=self.request.user) | Q(assignees__in=[self.request.user])).distinct()

    @action(detail=True, methods=['GET'])
    def assignees(self, request, pk=None):
        project = self.get_object()
        assignees = project.assignees.distinct()
        serializer = serializers.ComprehensiveUserSerializer(assignees, many=True)
        return Response(serializer.data)


class ProjectMembershipViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH', 'DELETE']:
            return serializers.CreateProjectMembershipSerializer
        return serializers.ProjectMembershipSerializer

    permission_classes = [IsAdminOrStaffUser]

    queryset = ProjectMembership.objects.all()


class GroupPermissionsViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH', 'DELETE']:
            return serializers.GroupPermissionsSerializer
        return serializers.DetailedGroupPermissionsSerializer

    permission_classes = [IsAdminUser]

    queryset = Group.objects.all()


class IssueViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']
    filter_backends = [DjangoFilterBackend]
    filterset_class = IssueFilter

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH', 'DELETE']:
            return serializers.CreateIssueSerializer
        return serializers.IssueSerializer

    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method in ['POST', 'PATCH', 'DELETE']:
            return [IsAuthenticated()]
        return [IsAuthenticated()]

    def get_serializer_context(self):
        return {'reporter_id': self.request.user.id}

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Issue.objects.prefetch_related('assignee').select_related('reporter').select_related('project').all()
        return Issue.objects.filter(Q(reporter_id=self.request.user) | Q(assignee=self.request.user))


class CommentViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH', 'PUT']:
            return serializers.CreateCommentSerializer
        return serializers.CommentSerializer

    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'user_id': self.request.user.id}

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Comment.objects.select_related('issue').select_related('user').all()
        return Comment.objects.all()


class WorklogViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH', 'PUT']:
            return serializers.CreateWorkLogSerializer
        return serializers.WorkLogSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return WorkLog.objects.select_related('issue').select_related('user').all()
        else:
            return WorkLog.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Set the user to the current user
        serializer.validated_data['user'] = self.request.user

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.validated_data['user'] = self.request.user
        serializer.save()

    def perform_update(self, serializer):
        serializer.validated_data['updated_by'] = self.request.user
        serializer.save()


class WatcherViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"

    queryset = Watcher.objects.select_related('user').select_related('issue').all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.CreateWatcherSerializer
        return serializers.WatcherSerializer

    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'user_id': self.request.user.id}

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Watcher.objects.select_related('issue').select_related('user').all()
        return Watcher.objects.filter(user_id=self.request.user)


class ProjectIssuesViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']
    serializer_class = serializers.ProjectIssuesSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = IssueFilter
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'project_id': self.kwargs['project_pk']}

    def get_queryset(self):
        if self.request.user.is_staff:
            return Issue.objects.filter(project_id=self.kwargs['project_pk']).select_related('reporter')

        return Issue.objects.filter(project_id=self.kwargs['project_pk']).select_related('reporter').filter(
            Q(reporter_id=self.request.user) | Q(assignee=self.request.user))

        issue_type = self.request.query_params.get('issue_type', None)
        if issue_type:
            queryset = queryset.filter(issue_type=issue_type)

        return queryset

    # def get_queryset(self):
    #     user = self.request.user
    #     if user.is_staff:
    #         return Issue.objects.prefetch_related('assignee').select_related('reporter').select_related('project').all()
    #     return Issue.objects.filter(Q(reporter_id=self.request.user) | Q(assignee=self.request.user))
    #


class GlobalSearchView(APIView):
    def get(self, request, *args, **kwargs):
        query = request.query_params.get('q', '')

        if self.request.user.is_staff:
            projects = Project.objects.filter(Q(name__icontains=query) | Q(description__icontains=query)).distinct()
            issues = Issue.objects.filter(
                Q(name__icontains=query) | Q(summary__icontains=query) | Q(description__icontains=query))
        else:
            projects = Project.objects.filter(Q(name__icontains=query) | Q(description__icontains=query)).filter(
                Q(project_lead=self.request.user) | Q(assignees__in=[self.request.user])).distinct()
            issues = Issue.objects.filter(
                Q(name__icontains=query) | Q(summary__icontains=query) | Q(description__icontains=query)).filter(
                Q(reporter_id=self.request.user) | Q(assignee=self.request.user))

        project_serializer = serializers.ProjectSerializer(projects, many=True)
        issue_serializer = serializers.IssueSerializer(issues, many=True)

        return Response({'projects': project_serializer.data, 'issues': issue_serializer.data})


class ValidateSlug(APIView):
    def post(self, request, format=None):
        serializer = serializers.ProjectSlugSerializer(data=request.data)
        if serializer.is_valid():
            project_name = serializer.validated_data.get('project_name')
            unique_slug = self.generate_unique_slug(project_name)
            return Response({'unique_slug': unique_slug}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def generate_unique_slug(self, project_name):
        base_slug = slugify(project_name)
        slug = base_slug

        while Project.objects.filter(slug=slug).exists():
            random_chars = get_random_string(length=3, allowed_chars='abcdefghijklmnopqrstuvwxyz')
            slug = f"{base_slug}-{random_chars}"

        return slug[:10]

    def get(self, request, format=None):
        slug = request.query_params.get('slug_name', '')
        if slug and Project.objects.filter(slug=slug).exists():
            return Response({'error': 'Key already exists for another project.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'unique_slug': slug}, status=status.HTTP_200_OK)


def upload(request):
    if request.method == "POST":
        file = request.FILES.getlist('file')
        for i in file:
            Issue.objects.file.create(file=i)
            data = Issue.objects.file.all()

            return render(request, "", locals())
