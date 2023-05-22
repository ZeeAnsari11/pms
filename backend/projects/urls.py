from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register('projects', views.ProjectViewSet, basename='projects')
router.register('issues', views.IssueViewSet, basename='issues')
router.register('comments', views.CommentViewSet, basename='comments')
router.register('worklogs', views.WorklogViewSet, basename='worklogs')
router.register('watchers', views.WatcherViewSet, basename='watchers')

router.register('project_categories', views.ProjectCategoryViewSet, basename="project_categories")
router.register('issues_type', views.IssuesTypeViewSet, basename="issues_type")
router.register('issues_status', views.IssuesStatusViewSet, basename="issues_status")
router.register('issues_priority', views.IssuesPriorityViewSet, basename="issues_priority")
router.register('users_list', views.UserViewSet, basename='users')
router.register('labels', views.LabelViewSet, basename='labels')

projects_router = routers.NestedDefaultRouter(router, 'projects', lookup='project')
projects_router.register('issues', views.ProjectIssuesViewSet, basename='projects-issues')

# router.register('projects')
# urlpatterns = [
#
# ]
urlpatterns = router.urls + projects_router.urls
