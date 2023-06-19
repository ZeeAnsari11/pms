from django_filters.rest_framework import FilterSet
from .models import Issue


class IssueFilter(FilterSet):
    class Meta:
        model = Issue
        fields = {
            'name': ['iexact'],
            'priority': ['iexact'],
            'assignee__username': ['iexact'],
            'reporter__username': ['iexact'],
            'project__name': ['iexact'],
            'type__type': ['iexact'],
            'status__status': ['iexact'],

        }
