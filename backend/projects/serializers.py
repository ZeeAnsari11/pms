from rest_framework import serializers
from . import models
from django.contrib.auth.models import User
from django.db.models.aggregates import Count
from register.serializers import CompanySerializer
from django.core.files.storage import default_storage
import os


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


class ProjectLabelsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProjectLabels
        fields = "__all__"


class ProjectSlackWebhookSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProjectSlackWebhook
        fields = "__all__"


class ProjectSMTPWebhookSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProjectSMTPWebhook
        fields = "__all__"


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'last_login', 'is_superuser', 'email', 'is_staff', 'is_active', 'user_permissions']


class ProjectSerializer(serializers.ModelSerializer):
    assignees = CustomUserSerializer(many=True)
    project_lead = CustomUserSerializer(read_only=True)
    type = ProjectTypeSerialzer(read_only=True)
    status = ProjectStatusSerializer(read_only=True)
    category = ProjectCategorySerializer(read_only=True)
    label = ProjectLabelsSerializer(read_only=True)
    company = CompanySerializer(read_only=True)

    class Meta:
        model = models.Project
        fields = ["id", 'icon', 'name', 'slug', 'key', 'assignees', 'project_lead', 'description', 'company', 'status',
                  'type', 'label', 'category']


class ProjectIssuesSerializer(serializers.ModelSerializer):
    assignee = CustomUserSerializer(read_only=True)
    reporter = CustomUserSerializer(read_only=True)
    created_by = CustomUserSerializer(read_only=True)
    updated_by = CustomUserSerializer(read_only=True)
    label = ProjectLabelsSerializer(read_only=True)
    type = ProjectTypeSerialzer(read_only=True)
    status = ProjectStatusSerializer(read_only=True)

    class Meta:
        model = models.Issue
        fields = "__all__"


class CreateProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Project
        fields = ["id", 'icon', 'name', 'slug', 'key', 'assignees', 'project_lead', 'description', 'company',
                  'category']


def save_file_to_storage(file):
    # Generate a unique file name
    file_name = default_storage.get_available_name(file.name)

    # Define the folder path
    folder_path = 'issues_attachment'

    # Create the folder if it doesn't exist
    folder_full_path = os.path.join(default_storage.location, folder_path)
    if not os.path.exists(folder_full_path):
        os.makedirs(folder_full_path)

    # Concatenate the folder path with the file name
    file_path = os.path.join(folder_path, file_name)

    # Save the file to the specified file path
    saved_file_path = default_storage.save(file_path, file)

    # Return the URL of the saved file
    return default_storage.url(saved_file_path)


class CreateIssueSerializer(serializers.ModelSerializer):
    file = serializers.ListField(child=serializers.FileField(), required=False)

    class Meta:
        model = models.Issue
        fields = "__all__"

    def create(self, validated_data):
        files = validated_data.pop('file', [])
        issue = super().create(validated_data)

        # Process file uploads and convert them to a list of file URLs
        file_urls = []
        for file in files:
            # Save the file to a storage location (e.g., AWS S3, local storage)
            # and obtain the URL for the saved file
            file_url = save_file_to_storage(file)
            file_urls.append(file_url)

        issue.file = file_urls
        issue.save()
        return issue


class IssueSerializer(serializers.ModelSerializer):
    assignee = CustomUserSerializer(read_only=True)
    reporter = CustomUserSerializer(read_only=True)
    label = ProjectLabelsSerializer(read_only=True)
    type = ProjectTypeSerialzer(read_only=True)
    status = ProjectStatusSerializer(read_only=True)

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
        fields = ['time_spent', 'comment', 'issue_id']


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
