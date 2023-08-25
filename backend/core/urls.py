from dj_rest_auth.views import (
    LoginView, LogoutView, PasswordChangeView, PasswordResetConfirmView,
    PasswordResetView, UserDetailsView,
)
from dj_rest_auth.registration.views import VerifyEmailView, ConfirmEmailView
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
        'password/reset/confirm/<slug:uidb64>/<slug:token>/',
        PasswordResetConfirmView.as_view(), name='password_reset_confirm'
    ),
    path('login/', LoginView.as_view(), name='rest_login'),
    # URLs that require a user to be logged in with a valid session / token.
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('password/change/',
         PasswordChangeView.as_view(),
         name='rest_password_change'
    ),
    path(
        'dj-rest-auth/registration/account-confirm-email/<str:key>/',
        ConfirmEmailView.as_view(),
    ),
    path('registration/', include('dj_rest_auth.registration.urls')),
    path(
        'registration/account-confirm-email/',
         VerifyEmailView.as_view(),
         name='account_email_verification_sent'
    ),
    re_path(r'^social-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    re_path(r'^social-auth/google/', GoogleLogin.as_view(), name='google_login'),

]
