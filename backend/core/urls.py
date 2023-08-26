from dj_rest_auth.views import (
    LoginView, LogoutView, PasswordChangeView, PasswordResetConfirmView,
    PasswordResetView
)
from django.views.generic import TemplateView
from django.urls import path, re_path, include
from .views import FacebookLogin, GoogleLogin

urlpatterns = [
    path('', TemplateView.as_view(template_name="core/index.html")),
    path('password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
    path(
        'password/reset/confirm/',
        PasswordResetConfirmView.as_view(),
        name='rest_password_reset_confirm'
    ),
    path(
        'password/reset/confirm/<str:uidb64>/<str:token>',
        PasswordResetConfirmView.as_view(),
        name='password_reset_confirm'
    ),
    path('login/', LoginView.as_view(), name='rest_login'),
    # URLs that require a user to be logged in with a valid session / token.
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('password/change/',
         PasswordChangeView.as_view(),
         name='rest_password_change'
         ),
    path('registration/', include('dj_rest_auth.registration.urls')),
    re_path(r'^social-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    re_path(r'^social-auth/google/', GoogleLogin.as_view(), name='google_login'),

]
