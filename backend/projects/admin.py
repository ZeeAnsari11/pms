from django.contrib import admin
from . import models
from django.db.models.aggregates import Count
from django.utils.html import format_html, urlencode
from django.urls import reverse


# Register your models here.

class IssueInline(admin.StackedInline):
    model = models.Issue

    # readonly_fields = ['name', 'summary', 'description', 'file', 'project', 'assignee', 'reporter', 'type', 'status',
    #                    'priority', 'created_at', 'updated_at']
    min_num = 1
    max_num = 5
    extra = 0
    can_delete = False


class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'company', 'project_category', 'project_lead', 'issues']
    prepopulated_fields = {
        'slug': ['name']
    }
    autocomplete_fields = ['company', 'project_category', 'project_lead']
    search_fields = ['name']
    list_editable = ['project_category', 'project_lead']

    # inlines = [IssueInline]

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
    list_display = ['name', 'project', 'summary', 'reporter', 'type', 'status', 'priority']
    search_fields = ['name', 'project__name']
    autocomplete_fields = ['project', 'reporter', 'type', 'status', 'priority']
    list_editable = ['type', 'status', 'priority']


class CommentAdmin(admin.ModelAdmin):
    list_display = ['body', 'issue', 'user']
    autocomplete_fields = ['issue', 'user']
    search_fields = ['body', 'issue__name']

    def save_model(self, request, obj, form, change):
        if not change:  # only set the field if the object is new
            obj.user = request.user
        super().save_model(request, obj, form, change)

    # readonly_fields = ['user']


# class AttachmentAdmin(admin.ModelAdmin):
#     list_display = ['file', 'uploaded_by']
#     autocomplete_fields = ['issue', 'uploaded_by']


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
    list_display = ['project_category']
    search_fields = ['project_category']


class IssuesTypeAdmin(admin.ModelAdmin):
    list_display = ['issue_type']
    search_fields = ['type']


class IssuesStatusAdmin(admin.ModelAdmin):
    list_display = ['issue_status']
    search_fields = ['status']


class IssuesPriorityAdmin(admin.ModelAdmin):
    list_display = ['issue_priority']
    search_fields = ['priority']


admin.site.register(models.Project, ProjectAdmin)
admin.site.register(models.Issue, IssueAdmin)
admin.site.register(models.Comment, CommentAdmin)
# admin.site.register(models.Attachment, AttachmentAdmin)
admin.site.register(models.WorkLog, WorkLogAdmin)
admin.site.register(models.Watcher, WatcherAdmin)
admin.site.register(models.ProjectCategory, ProjectCategoryAdmin)
admin.site.register(models.IssuesType, IssuesTypeAdmin)
admin.site.register(models.IssuesStatus, IssuesStatusAdmin)
admin.site.register(models.IssuesPriority, IssuesPriorityAdmin)
