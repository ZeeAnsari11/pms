from rest_framework import serializers
from . import models
from django.contrib.auth.models import User
from django.db.models.aggregates import Count
from register.serializers import CompanySerializer


class ProjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProjectCategory
        fields = "__all__"


class IssuesTypeSerialzer(serializers.ModelSerializer):
    class Meta:
        model = models.IssuesType
        fields = "__all__"


class IssuesStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.IssuesStatus
        fields = "__all__"


class IssuesPrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.IssuesPriority
        fields = "__all__"


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'last_login', 'is_superuser', 'email', 'is_staff', 'is_active', 'user_permissions']


class ProjectIssuesSerializer(serializers.ModelSerializer):
    type = IssuesTypeSerialzer(read_only=True)
    status = IssuesStatusSerializer(read_only=True)
    priority = IssuesPrioritySerializer(read_only=True)
    assignee = CustomUserSerializer(many=True, read_only=True)
    reporter = CustomUserSerializer(read_only=True)

    class Meta:
        model = models.Issue
        fields = ["id", 'name', 'summary', 'description', 'assignee', 'file', 'type', 'status', 'priority',
                  'created_at', 'updated_at', 'reporter']

    # def create(self, validated_data):
    #     project_id = self.context['issue_id']
    #     return models.Project.objects.create(project_id=project_id, **validated_data)


class CreateProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Project
        fields = ["id", 'name', 'slug', 'assignee', 'description', 'company', 'project_category']


class ProjectSerializer(serializers.ModelSerializer):
    project_category = ProjectCategorySerializer(read_only=True)
    assignee = CustomUserSerializer(read_only=True, many=True)
    company = CompanySerializer(read_only=True)

    class Meta:
        model = models.Project
        fields = ["id", 'name', 'slug', 'assignee', 'description', 'company', 'project_category']

    # issues_count = serializers.SerializerMethodField(method_name='cal_issues_count')
    #
    # def cal_issues_count(self, project):
    #     return Count(project.issues_count)


class CreateIssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Issue
        fields = "__all__"


class IssueSerializer(serializers.ModelSerializer):
    type = IssuesTypeSerialzer(read_only=True)
    status = IssuesStatusSerializer(read_only=True)
    priority = IssuesPrioritySerializer(read_only=True)
    assignee = CustomUserSerializer(read_only=True, many=True)
    reporter = CustomUserSerializer(read_only=True)
    project = ProjectSerializer(read_only=True)

    class Meta:
        model = models.Issue
        fields = "__all__"


class CreateCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    issue = IssueSerializer(read_only=True)

    class Meta:
        model = models.Comment
        fields = "__all__"


class CreateWorkLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.WorkLog
        fields = "__all__"


class WorkLogSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    issue = IssueSerializer(read_only=True)

    class Meta:
        model = models.WorkLog
        fields = "__all__"


class CreateWatcherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Watcher
        fields = "__all__"


class WatcherSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    issue = IssueSerializer(read_only=True)

    class Meta:
        model = models.Watcher
        fields = "__all__"
