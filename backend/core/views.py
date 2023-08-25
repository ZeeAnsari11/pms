from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import Permission
from rest_framework.viewsets import ModelViewSet
from .filters import UserProfileFilter
from django.conf import settings
from .models import UserProfile
from . import serializers


class UserProfileViewSet(ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    http_method_names = ['get', 'post', 'patch', 'delete']
    filter_backends = [DjangoFilterBackend]
    filterset_class = UserProfileFilter
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.CreateUserProfileSerializer
        return serializers.UserProfileSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return UserProfile.objects.all()
        return UserProfile.objects.filter(user=self.request.user)

    def get_object(self):
        if self.kwargs.get('pk') == 'me':
            return self.get_queryset().first()
        return super().get_object()


class UserGroupPermissionViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']
    filterset_fields = "__all__"
    queryset = Permission.objects.all()
    serializer_class = serializers.PermissionSerializer


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class GoogleLogin(SocialLoginView): # if you want to use Authorization Code Grant, use this
    adapter_class = GoogleOAuth2Adapter
    callback_url = settings.CALLBACK_URL_SET_ON_GOOGLE
    client_class = OAuth2Client
