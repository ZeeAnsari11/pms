from rest_framework_nested import routers
from . import views
from core.views import UserProfileViewSet
from register.views import CompanyViewSet
from django.urls import path

router = routers.DefaultRouter()
router.register('projects', views.ProjectViewSet, basename='projects')
router.register('issues', views.IssueViewSet, basename='issues')
router.register('comments', views.CommentViewSet, basename='comments')
router.register('worklogs', views.WorklogViewSet, basename='worklogs')
router.register('watchers', views.WatcherViewSet, basename='watchers')

router.register('project_categories', views.ProjectCategoryViewSet, basename="project_categories")
router.register('project_type', views.ProjectTypeViewSet, basename="project_type")
router.register('project_status', views.ProjectStatusViewSet, basename="project_status")
router.register('project_labels', views.ProjectLabelsViewSet, basename='project_labels')
router.register('project_slack_webhook', views.ProjectSlackWebhookViewSet, basename='project_slack_webhook')
router.register('project_smtp_webhook', views.ProjectSMTPWebhookViewSet, basename='project_smtp_webhook')

router.register('users_list', views.UserViewSet, basename='users')
router.register('userprofile', UserProfileViewSet, basename='userprofile')

router.register('companies', CompanyViewSet, basename='companies')

projects_router = routers.NestedDefaultRouter(router, 'projects', lookup='project')
projects_router.register('issues', views.ProjectIssuesViewSet, basename='projects-issues')

urlpatterns = [path('api/projects/<int:pk>/assignees/', views.ProjectViewSet.as_view({'get': 'assignees'}),
                    name='project-assignees'), ] + router.urls + projects_router.urls
