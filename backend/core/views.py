from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import Permission
from .models import UserProfile
from .filters import UserProfileFilter
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
