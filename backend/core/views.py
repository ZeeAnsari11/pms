from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import Permission
from rest_framework.response import Response
from rest_framework import status
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

    def update(self, request, *args, **kwargs):
        # Call the parent class update method to perform the update
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Return the updated data using UserProfileSerializer
        response_serializer = serializers.UserProfileSerializer(instance)
        return Response(response_serializer.data, status=status.HTTP_200_OK)


class UserGroupPermissionViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']
    filterset_fields = "__all__"
    queryset = Permission.objects.all()
    serializer_class = serializers.PermissionSerializer
