from rest_framework_nested import routers
from . import views
from core.views import UserProfileViewSet

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
router.register('project_slack_webhook_urls', views.ProjectSlackWebhookUrlViewSet, basename='project_slack_webhook_urls')

router.register('users_list', views.UserViewSet, basename='users')
router.register('userprofile', UserProfileViewSet, basename='userprofile')

projects_router = routers.NestedDefaultRouter(router, 'projects', lookup='project')
projects_router.register('issues', views.ProjectIssuesViewSet, basename='projects-issues')

urlpatterns = router.urls + projects_router.urls
