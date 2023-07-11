from django_filters.rest_framework import FilterSet
from .models import Issue, WorkLog


class IssueFilter(FilterSet):
    class Meta:
        model = Issue
        fields = {
            'slug': ['iexact'],
            'name': ['iexact'],
            'priority': ['iexact'],
            'assignee__username': ['iexact'],
            'reporter__username': ['iexact'],
            'project__name': ['iexact'],
            'project__id': ['iexact'],
            'type__type': ['iexact'],
            'status__status': ['iexact'],

        }


class WorklogFilter(FilterSet):
    class Meta:
        model = WorkLog
        fields = {
            'time_spent': ['iexact'],
            'comment': ['iexact'],
            'user__username': ['iexact'],
            'issue__id': ['iexact'],
            'issue__slug': ['iexact'],
            'issue__project__id': ['iexact'],
            'created_at': ['iexact'],
            'updated_at': ['iexact'],
        }
