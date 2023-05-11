from django.views.generic import TemplateView
from django.urls import path
from . import views

urlpatterns = [
    path('', TemplateView.as_view(template_name="core/index.html")),
    path('api/avatar/', views.AvatarView.as_view(), name='avatar'),
    path('api/avatar/all/', views.AllAvatarView.as_view(), name='all-avatar'),

]
