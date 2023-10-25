from rest_framework import permissions
from rest_framework.permissions import BasePermission
from django.shortcuts import get_object_or_404
from .models import ProjectMembership, Project
from django.http import Http404


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

    def has_permission(self, request, view):
        try:
            # Try to get project from URL parameters
            project = get_object_or_404(Project, pk=view.kwargs.get('project_pk'))
            project_member = get_object_or_404(ProjectMembership, project=project, user=request.user)
        except Http404:
            # If project not found in URL parameters, try to get from request parameters
            project_id = request.GET.get('project_id')
            if project_id:
                project = get_object_or_404(Project, pk=project_id)
                project_member = get_object_or_404(ProjectMembership, project=project, user=request.user)
            else:
                return False  # If project not found in request parameters, return False
        if project and project_member:
            if view.action == 'list' or view.action == 'retrieve':
                return project_member.group.permissions.filter(codename=view.view_perm).exists()
            elif view.action == 'create':
                return project_member.group.permissions.filter(codename=view.add_perm).exists()
            elif view.action == 'update' or view.action == 'partial_update':
                return project_member.group.permissions.filter(codename=view.change_perm).exists()
            elif view.action == 'destroy':
                return project_member.group.permissions.filter(codename=view.delete_perm).exists()
        else:
            return False


class IsCreatorOrAdminOrStaffUser(permissions.BasePermission):
    """
    Custom permission to only allow the creator or admin/staff users to edit/delete a model.
    """

    def has_object_permission(self, request, view, obj):
        # Allow GET request (read-only)
        if request.method in permissions.SAFE_METHODS:
            return True

        # Allow if the user is the creator of the comment or is an admin/staff user
        return obj.user == request.user or request.user.is_superuser or request.user.is_staff
