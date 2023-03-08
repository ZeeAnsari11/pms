from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import RetrieveModelMixin, CreateModelMixin
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser
from .models import Project, Issue, Comment, WorkLog, Watcher
from . import serializers


# Create your views here.

class ProjectViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']

    # queryset = Project.objects.prefetch_related('assignee').select_related('company').all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.CreateProjectSerializer
        return serializers.ProjectSerializer

    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method in ['POST', 'PATCH', 'DELETE']:
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def get_serializer_context(self):
        return {'assignee': self.request.user.id}

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Project.objects.prefetch_related('assignee').select_related('company').all()
        return Project.objects.filter(assignee=self.request.user)

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
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def get_serializer_context(self):
        return {'reporter_id': self.request.user.id}

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Issue.objects.prefetch_related('assignee').select_related('reporter').select_related('project').all()
        return Issue.objects.filter(reporter_id=self.request.user)


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

    queryset = WorkLog.objects.select_related('issue').select_related('user').all()

    # serializer_class = serializers.WorkLogSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.CreateWorkLogSerializer
        return serializers.WorkLogSerializer

    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'user_id': self.request.user.id}

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return WorkLog.objects.select_related('issue').select_related('user').all()
        return WorkLog.objects.filter(user_id=self.request.user)


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
