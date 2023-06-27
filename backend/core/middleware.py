from django.contrib.auth.models import Group
from projects.models import ProjectMembership


class AssignGroupMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Check if the user is_staff or superuser
        if request.user.is_staff or request.user.is_superuser:
            response = self.get_response(request)
            return response

        project_id = request.data.get('project_id')
        user_id = request.user.id
        membership = ProjectMembership.objects.get(user_id=user_id, project_id=project_id)

        try:
            request.user.groups.add(membership.group)
        except Group.DoesNotExist:
            pass

        response = self.get_response(request)
        return response
