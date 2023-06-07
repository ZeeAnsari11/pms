from datetime import datetime
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import Issue
from .tasks import *


@receiver(post_save, sender=Issue)
def new_issues_notifications_handler(sender, instance, created, **kwargs):
    if created:
        send_new_task_notification(instance)


@receiver(pre_save, sender=Issue)
def update_issues_notifications_handler(sender, instance, **kwargs):
    try:
        old_instance = Issue.objects.get(pk=instance.pk)
        if old_instance.status != instance.status:
            old_status = old_instance.status or 'None'
            new_status = instance.status or 'None'
            send_task_status_notification(instance, old_status, new_status)
        if old_instance.assignee != instance.assignee:
            old_assignee = old_instance.assignee or 'Unassigned'
            new_assignee = instance.assignee or 'Unassigned'
            send_task_assignee_notification(instance, old_assignee, new_assignee)
    except Issue.DoesNotExist:
        return