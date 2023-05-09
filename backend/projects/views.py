from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.decorators import api_view, action
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser
from .models import Project, Issue, Comment, WorkLog, Watcher, ProjectCategory, IssuesType, IssuesPriority, IssuesStatus
from . import serializers


# Create your views here.
class UserViewSet(ModelViewSet):
    http_method_names = ['get']
    serializer_class = serializers.CustomUserSerializer
    permission_classes = [IsAuthenticated]

    queryset = User.objects.all()


class ProjectCategoryViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']
    serializer_class = serializers.ProjectCategorySerializer
    permission_classes = [IsAuthenticated]

    queryset = ProjectCategory.objects.all()


class IssuesTypeViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']

    serializer_class = serializers.IssuesTypeSerialzer
    permission_classes = [IsAuthenticated]

    queryset = IssuesType.objects.all()


class IssuesStatusViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']

    serializer_class = serializers.IssuesStatusSerializer
    permission_classes = [IsAuthenticated]

    queryset = IssuesStatus.objects.all()


class IssuesPriorityViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']

    serializer_class = serializers.IssuesPrioritySerializer
    permission_classes = [IsAuthenticated]

    queryset = IssuesPriority.objects.all()


class ProjectViewSet(ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    http_method_names = ['get', 'post', 'patch', 'delete']

    # queryset = Project.objects.prefetch_related('assignee').select_related('company').all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.CreateProjectSerializer
        return serializers.ProjectSerializer

    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method in ['POST', 'PATCH', 'DELETE']:
            return [IsAuthenticated()]
        return [IsAuthenticated()]

    def get_serializer_context(self):
        return {'assignee': self.request.user.id}

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Project.objects.prefetch_related('assignee').prefetch_related('project_lead').select_related(
                'company').select_related(
                'project_category').all()
        return Project.objects.filter(Q(project_lead=self.request.user) | Q(assignee=self.request.user))

    # serializer_class = serializers.ProjectSerializer

    # def get_serializer_context(self):
    #     return {'request': self.request}


class IssueViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    # queryset = Issue.objects.prefetch_related('assignee').select_related('reporter').select_related('project').all()

    # serializer_class = serializers.IssueSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST':
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
            return Issue.objects.prefetch_related('assignee').select_related('reporter').select_related(
                'project').select_related('type').select_related('status').select_related('priority').all()
        return Issue.objects.filter(Q(reporter_id=self.request.user) | Q(assignee=self.request.user))


class CommentViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    # queryset = Comment.objects.select_related('issue').select_related('user').all()

    # serializer_class = serializers.CommentSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.CreateCommentSerializer
        return serializers.CommentSerializer

    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'user_id': self.request.user.id}

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Comment.objects.select_related('issue').select_related('user').all()
        return Comment.objects.filter(user_id=self.request.user)


class WorklogViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def get_serializer_class(self):
        if self.request.method == 'POST':
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
        serializer.validated_data['user'] = self.request.user
        serializer.save()


class WatcherViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    queryset = Watcher.objects.select_related('user').select_related('issue').all()

    # serializer_class = serializers.WatcherSerializer
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
    http_method_names = ['get']
    serializer_class = serializers.ProjectIssuesSerializer
    permission_classes = [IsAuthenticated]

    # queryset = Issue.objects.all()

    def get_serializer_context(self):
        return {'project_id': self.kwargs['project_pk']}

    def get_queryset(self):
        return Issue.objects.filter(project_id=self.kwargs['project_pk']).select_related('reporter')
