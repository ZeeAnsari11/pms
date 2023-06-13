from django.contrib import admin
from . import models
from django.db.models.aggregates import Count
from django.utils.html import format_html, urlencode
from django.urls import reverse


# Register your models here.

class IssueInline(admin.StackedInline):
    model = models.Issue
    min_num = 1
    max_num = 5
    extra = 0
    can_delete = False


class ProjectLabelAdmin(admin.ModelAdmin):
    list_display = ['project', 'name', 'color']
    search_fields = ['name']
    autocomplete_fields = ['project']


class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'company', 'category', 'project_lead', 'assignee', 'issues', 'slack_webhook_url']
    prepopulated_fields = {'slug': ['name']}
    autocomplete_fields = ['company', 'category', 'assignee', 'project_lead', 'slack_webhook_url']
    search_fields = ['name']
    list_editable = ['category', 'project_lead', 'assignee', 'slack_webhook_url']

    def issues(self, project):
        url = (
                reverse('admin:projects_issue_changelist')
                + '?'
                + urlencode({
            'project__id': str(project.id)
        }))
        return format_html('<a href="{}">{} Issues</a>', url, project.issues_count)

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            issues_count=Count('issue')
        )


class IssueAdmin(admin.ModelAdmin):
    list_display = ['name', 'project', 'assignee', 'summary', 'status', 'type', 'label', 'reporter', 'priority',
                    'created_by', 'updated_by']
    search_fields = ['name', 'project__name']
    autocomplete_fields = ['project', 'assignee', 'reporter', 'created_by', 'updated_by', 'status', 'type', 'label']
    list_editable = ['priority', 'assignee', 'status', 'type', 'label']


class CommentAdmin(admin.ModelAdmin):
    list_display = ['body', 'issue', 'user']
    autocomplete_fields = ['issue', 'user']
    search_fields = ['body', 'issue__name']

    def save_model(self, request, obj, form, change):
        if not change:  # only set the field if the object is new
            obj.user = request.user
        super().save_model(request, obj, form, change)


class WorkLogAdmin(admin.ModelAdmin):
    list_display = ['issue', 'comment', 'time_spent', 'user']
    autocomplete_fields = ['issue', 'user']
    list_display_links = ['issue']
    list_editable = ['time_spent', 'user']


class WatcherAdmin(admin.ModelAdmin):
    list_display = ['user', 'issue']
    autocomplete_fields = ['user', 'issue']
    list_display_links = ['user']
    list_editable = ['issue']


class ProjectCategoryAdmin(admin.ModelAdmin):
    list_display = ['category']
    search_fields = ['category']


class ProjectTypeAdmin(admin.ModelAdmin):
    list_display = ['project', 'type']
    search_fields = ['type']
    autocomplete_fields = ['project']


class ProjectSlackWebhookAdmin(admin.ModelAdmin):
    list_display = ['project', 'slack_webhook_url', 'slack_webhook_channel', 'slack_notification_status']
    search_fields = ['slack_webhook_url', 'slack_webhook_channel', 'slack_notification_status']


class ProjectSMTPWebhookAdmin(admin.ModelAdmin):
    list_display = ['project', 'hostname', 'port', 'username', 'password', 'security_protocol']
    search_fields = ['project', 'hostname', 'port', 'username', 'password', 'security_protocol']


class ProjectStatusAdmin(admin.ModelAdmin):
    list_display = ['project', 'status']
    search_fields = ['status']
    autocomplete_fields = ['project']



admin.site.register(models.Project, ProjectAdmin)

admin.site.register(models.ProjectCategory, ProjectCategoryAdmin)
admin.site.register(models.ProjectLabels, ProjectLabelAdmin)
admin.site.register(models.ProjectType, ProjectTypeAdmin)
admin.site.register(models.ProjectStatus, ProjectStatusAdmin)
admin.site.register(models.ProjectSlackWebhook, ProjectSlackWebhookAdmin)
admin.site.register(models.ProjectSMTPWebhook, ProjectSMTPWebhookAdmin)

admin.site.register(models.Issue, IssueAdmin)

admin.site.register(models.Comment, CommentAdmin)
admin.site.register(models.WorkLog, WorkLogAdmin)
admin.site.register(models.Watcher, WatcherAdmin)
