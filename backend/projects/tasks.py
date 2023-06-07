from datetime import datetime
from .models import ProjectSlackWebhookUrl
from celery import shared_task
import requests
import os


def send_new_task_notification(instance):
    url = fetch_slack_webhook_url(instance.project_id)
    if not url:
        return
    issue_priority = instance.priority or 'High'
    issue_status = instance.status or 'In Progress'
    issue_type = instance.type or 'Bug'
    message = {
        "text": f"*{instance.created_by} created a {issue_type}*",
        "attachments": [
            {
                "title": f"*{instance.name}*",
                "title_link": f"{os.environ.get('APP_NAME')}browse/ABC-123",  # @todo update the issue id
                "text": f"{instance.summary}",
                "color": "#ffcc00",
                "fields": [
                    {
                        "title": "*Status:*",
                        "value": f"{issue_status}",
                        "short": f"{True}"
                    },
                    {
                        "title": "*Type:*",
                        "value": f"{issue_type}",
                        "short": f"{True}"
                    },
                    {
                        "title": "*Priority:*",
                        "value": f"{issue_priority}",
                        "short": f"{True}"
                    },
                    {
                        "title": "*Assignee:*",
                        "value": f"{instance.created_by}",
                        "short": f"{True}"
                    }
                ]
            }
        ]
    }
    send_slack_notification(url, message)


def send_task_status_notification(instance, old_status, new_status):
    url = fetch_slack_webhook_url(instance.project_id)
    if not url:
        return
    issue_type = instance.type or 'Bug'
    message = {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"*{instance.updated_by} transitioned a {issue_type} from `{old_status}` ⟶ `{new_status}`*"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"*<{os.environ.get('APP_NAME')}|{instance.name}>*"
                }
            }
        ]
    }
    send_slack_notification(url, message)


def send_task_assignee_notification(instance, old_assignee, new_assignee):
    url = fetch_slack_webhook_url(instance.project_id)
    if not url:
        return
    issue_type = instance.type or 'Bug'
    message = {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"*{instance.updated_by} assigned a {issue_type} from `{old_assignee}` ⟶ `{new_assignee}`*"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"*<{os.environ.get('APP_NAME')}|{instance.name}>*"
                }
            }
        ]
    }
    send_slack_notification(url, message)


def fetch_slack_webhook_url(product_id):
    try:
        webhook_url = ProjectSlackWebhookUrl.objects.get(project=product_id)
    except ProjectSlackWebhookUrl.DoesNotExist:
        return
    return webhook_url.slack_webhook_url or ''


def send_slack_notification(url, data):
    s = requests.Session()
    response = s.post(url, json=data)
    if response.status_code == 200:
        return
    else:
        return
