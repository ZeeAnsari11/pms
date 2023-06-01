from datetime import datetime
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver
from .models import Issue
import httpx
import asyncio
import os


@receiver(post_save, sender=Issue)
def send_task_create_notification(sender, instance, created, **kwargs):
    issue_status = 'In Progress'
    issue_priority = 'High'
    issue_type = 'Bug'
    if created:
        if instance is not None:
            issue_priority = f"{instance.priority}"
            if instance.project is not None:
                if hasattr(instance.project, 'status'):
                    issue_status = f"{instance.project.status}"
                    issue_type = f"{instance.project.type}"

    new_task_template = {
        "text": f"{instance.created_by} created a {issue_type}",
        "attachments": [
            {
                "title": f"*{instance.name}*",
                "title_link": f"{os.environ.get('APP_NAME')}browse/ABC-123",  # @todo update the issue id
                "text": instance.summary,
                "color": "#ffcc00",
                "fields": [
                    {
                        "title": "Status:",
                        "value": issue_status,
                        "short": True
                    },
                    {
                        "title": "Type:",
                        "value": issue_type,
                        "short": True
                    },
                    {
                        "title": "Priority:",
                        "value": issue_priority,
                        "short": True
                    }
                ]
            }
        ]
    }
    print(f"The {instance.name} issue delete request {new_task_template} was received on {datetime.now()}.")


@receiver(post_delete, sender=Issue)
def get_issue_notification(sender, **kwargs):
    print(f"The issue was deleted successfully on {datetime.now()}.")
