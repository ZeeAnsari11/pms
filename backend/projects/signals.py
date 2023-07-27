from datetime import datetime
from django.db import transaction
from django.utils.text import slugify
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
            old_status = old_instance.status.__str__().upper() or 'NONE'
            new_status = instance.status.__str__().upper() or 'NONE'
            send_task_status_notification(instance, old_status, new_status)
        if old_instance.assignee != instance.assignee:
            old_assignee = old_instance.assignee.__str__().upper() or 'UNASSIGNED'
            new_assignee = instance.assignee.__str__().upper() or 'UNASSIGNED'
            send_task_assignee_notification(instance, old_assignee, new_assignee)
    except Issue.DoesNotExist:
        return


@receiver(post_save, sender=Issue)
def post_save_issue(sender, instance, created, **kwargs):
    if created:
        @transaction.on_commit
        def update_slug():
            if not instance.slug or instance.project.name not in instance.slug:
                instance.slug = slugify(f"{instance.project.name} - {instance.pk}")
                instance.save()
