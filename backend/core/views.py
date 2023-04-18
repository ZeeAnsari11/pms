from rest_framework.generics import RetrieveAPIView
from .serializers import UserProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound
from .models import UserProfile
from rest_framework import status
from rest_framework.response import Response


class AvatarView(RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        try:
            return self.request.user.userprofile
        except UserProfile.DoesNotExist:
            raise NotFound('User Profile Not Found')

    def get(self, request, *args, **kwargs):
        user_profile = self.get_object()
        serializer = self.get_serializer(user_profile)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        user_profile = self.get_object()
        serializer = self.get_serializer(user_profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        if hasattr(request.user, 'userprofile'):
            return Response({'error': 'User profile already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        user_profile = UserProfile.objects.create(user=request.user)
        serializer = self.get_serializer(user_profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        user_profile.delete()
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        user_profile = self.get_object()
        user_profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
