from django_filters.rest_framework import FilterSet
from .models import UserProfile


class UserProfileFilter(FilterSet):
    class Meta:
        model = UserProfile
        fields = {
            'department': ['iexact'],
            'user__username': ['iexact'],
            'user__email': ['iexact'],
            'job_title': ['iexact'],
            'joining_date': ['iexact'],
        }
