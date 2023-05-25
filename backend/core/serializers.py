from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth.models import User
from register.serializers import CompanySerializer


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'last_login', 'is_superuser', 'email', 'is_staff', 'is_active', 'user_permissions']


# class UserProfileSerializer(serializers.ModelSerializer):
#     user = CustomUserSerializer(read_only=True)
#
#     class Meta:
#         model = UserProfile
#         fields = ('image', 'user')

class UserProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    company = CompanySerializer()  # Assuming you have defined the CompanySerializer in the 'register' app

    class Meta:
        model = UserProfile
        fields = ('image', 'user', 'company', 'department', 'job_title', 'joining_date')