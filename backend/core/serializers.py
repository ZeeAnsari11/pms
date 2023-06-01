from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth.models import User
from register.serializers import CompanySerializer


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class UserProfileSerializer(serializers.ModelSerializer):

    user = CustomUserSerializer()
    company = CompanySerializer()  # Assuming you have defined the CompanySerializer in the 'register' app

    class Meta:
        model = UserProfile
        fields = ('id', 'image', 'user', 'company', 'department', 'job_title', 'joining_date', 'is_reporter', 'is_assignee', 'send_email', 'email_format')


class CreateUserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ('id', 'image', 'user', 'company', 'department', 'job_title', 'joining_date', 'is_reporter', 'is_assignee',
                  'send_email', 'email_format')
