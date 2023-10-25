from django.contrib import admin
from solo.admin import SingletonModelAdmin
from .models import GlobalSlackConfig
from . import models
from django.db.models.aggregates import Count
from django.utils.html import format_html, urlencode
from django.urls import reverse
from django.contrib.auth.models import Permission


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
    list_display = ['name', 'company', 'category', 'project_lead', 'issues', 'slack_webhook']
    prepopulated_fields = {'slug': ['name']}
    autocomplete_fields = ['company', 'category', 'assignees', 'project_lead', 'slack_webhook']
    search_fields = ['name']
    list_editable = ['category', 'project_lead', 'slack_webhook']

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
    list_display = ['name', 'project', 'assignee', 'summary', 'status', 'type', 'reporter', 'priority',
                    'created_by', 'updated_by']
    search_fields = ['name', 'project__name']
    autocomplete_fields = ['project', 'assignee', 'reporter', 'created_by', 'updated_by', 'status', 'type', 'label']
    list_editable = ['priority', 'assignee', 'status', 'type']


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
    list_display = ['project', 'webhook_url', 'webhook_channel', 'is_active',
                    'global_status']
    search_fields = ['webhook_url', 'webhook_channel', 'is_active',
                     'global_status']


class ProjectStatusAdmin(admin.ModelAdmin):
    list_display = ['project', 'status']
    search_fields = ['status']
    autocomplete_fields = ['project']


class ProjectMembershipAdmin(admin.ModelAdmin):
    list_display = ['user', 'project', 'group']
    search_fields = ['user', 'project', 'group']
    autocomplete_fields = ['user', 'project', 'group']


admin.site.register(models.Project, ProjectAdmin)

admin.site.register(models.ProjectCategory, ProjectCategoryAdmin)
admin.site.register(models.ProjectLabels, ProjectLabelAdmin)
admin.site.register(models.ProjectType, ProjectTypeAdmin)
admin.site.register(models.ProjectStatus, ProjectStatusAdmin)
admin.site.register(models.ProjectSlackWebhook, ProjectSlackWebhookAdmin)
admin.site.register(GlobalSlackConfig, SingletonModelAdmin)
admin.site.register(models.ProjectMembership, ProjectMembershipAdmin)

admin.site.register(models.Issue, IssueAdmin)
admin.site.register(Permission)

admin.site.register(models.Comment, CommentAdmin)
admin.site.register(models.WorkLog, WorkLogAdmin)
admin.site.register(models.Watcher, WatcherAdmin)
