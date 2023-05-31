from rest_framework import serializers
from . import models
from django.contrib.auth.models import User
from django.db.models.aggregates import Count
from register.serializers import CompanySerializer


# from rest_framework import serializers


class ProjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProjectCategory
        fields = "__all__"


class ProjectTypeSerialzer(serializers.ModelSerializer):
    class Meta:
        model = models.ProjectType
        fields = "__all__"


class ProjectStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProjectStatus
        fields = "__all__"


class IssuesPrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.IssuesPriority
        fields = "__all__"


class ProjectLabelsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProjectLabels
        fields = "__all__"


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'last_login', 'is_superuser', 'email', 'is_staff', 'is_active', 'user_permissions']


class ProjectIssuesSerializer(serializers.ModelSerializer):
    priority = IssuesPrioritySerializer(read_only=True)
    assignee = CustomUserSerializer(read_only=True)
    reporter = CustomUserSerializer(read_only=True)

    class Meta:
        model = models.Issue
        fields = ["id", 'name', 'summary', 'description', 'assignee', 'file', 'priority',
                  'created_at', 'updated_at', 'reporter']

    # def create(self, validated_data):
    #     project_id = self.context['issue_id']
    #     return models.Project.objects.create(project_id=project_id, **validated_data)


class FileSerializer(serializers.Serializer):
    file = serializers.FileField(max_length=None, allow_empty_file=False)


class CreateProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Project
        fields = ["id", 'icon', 'name', 'slug', 'key', 'assignee', 'project_lead', 'description', 'company', 'status',
                  'type', 'label', 'project_category']


class ProjectSerializer(serializers.ModelSerializer):
    type = ProjectTypeSerialzer(read_only=True)
    status = ProjectStatusSerializer(read_only=True)
    project_category = ProjectCategorySerializer(read_only=True)
    assignee = CustomUserSerializer(read_only=True)
    label = ProjectLabelsSerializer(read_only=True)
    company = CompanySerializer(read_only=True)
    project_lead = CustomUserSerializer(read_only=True)

    class Meta:
        model = models.Project
        fields = ["id", 'icon', 'name', 'slug', 'key', 'assignee', 'project_lead', 'description', 'company', 'status',
                  'type', 'label', 'project_category']


class CreateIssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Issue
        fields = "__all__"


class IssueSerializer(serializers.ModelSerializer):
    priority = IssuesPrioritySerializer(read_only=True)
    assignee = CustomUserSerializer(read_only=True)
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
    issue_id = serializers.PrimaryKeyRelatedField(
        queryset=models.Issue.objects.all(),
        source='issue',
        required=True
    )

    class Meta:
        model = models.WorkLog
        fields = ('time_spent', 'comment', 'issue_id')


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
