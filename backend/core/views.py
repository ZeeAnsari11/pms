from rest_framework.generics import UpdateAPIView, RetrieveAPIView
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import UserProfileSerializer
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile
from . import serializers
from register.serializers import CompanySerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from . import serializers
from .models import UserProfile


class UserProfileViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']
    filterset_fields = "__all__"
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
