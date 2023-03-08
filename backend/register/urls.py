from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register('companies', views.CompanyViewSet, basename='companies')

urlpatterns = router.urls
