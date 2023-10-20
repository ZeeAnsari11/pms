from rest_framework import permissions
from rest_framework.permissions import BasePermission
from django.shortcuts import get_object_or_404
from .models import ProjectMembership, Project


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_superuser)


class IsAdminOrStaffUser(BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and (request.user.is_superuser or request.user.is_staff))


class HasPerms(BasePermission):
    def has_object_permission(self, request, view, obj):
        return True

    def has_permission(self, request, view):
        project = get_object_or_404(Project, pk=view.kwargs.get('project_pk'))
        project_member = get_object_or_404(ProjectMembership, project=project, user=request.user)
        if view.action == 'list' or view.action == 'retrieve':
            return project_member.group.permissions.filter(codename=view.view_perm).exists()
        elif view.action == 'create':
            return project_member.group.permissions.filter(codename=view.add_perm).exists()
        elif view.action == 'put' or view.action == 'patch':
            return project_member.group.permissions.filter(codename=view.change_perm).exists()
        elif view.action == 'destroy':
            return project_member.group.permissions.filter(codename=view.delete_perm).exists()
        return False
