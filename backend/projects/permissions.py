from rest_framework import permissions
from django.shortcuts import get_object_or_404
from .models import ProjectMembership, Project
from django.http import Http404


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_superuser)


class IsAdminOrStaffUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and (request.user.is_superuser or request.user.is_staff))


class HasPerms(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser or request.user.is_staff:
            return True

        project_pk = view.kwargs.get('project_pk') or request.GET.get('project_id')
        if not project_pk:
            return False

        try:
            project_member = ProjectMembership.objects.get(project__pk=project_pk, user=request.user)
        except ProjectMembership.DoesNotExist:
            return False

        if view.action in ('list', 'retrieve'):
            return project_member.group.permissions.filter(codename=view.view_perm).exists()
        elif view.action == 'create':
            return project_member.group.permissions.filter(codename=view.add_perm).exists()
        elif view.action in ('update', 'partial_update'):
            return project_member.group.permissions.filter(codename=view.change_perm).exists()
        elif view.action == 'destroy':
            return project_member.group.permissions.filter(codename=view.delete_perm).exists()

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
