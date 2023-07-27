from datetime import datetime
from .models import ProjectSlackWebhook
from .models import GlobalSlackConfig
import requests
import os


def send_new_task_notification(instance):
    slack_config = fetch_slack_config(instance.project_id)
    if not slack_config['url']:
        return
    issue_priority = instance.priority or 'High'
    issue_status = instance.status or 'In Progress'
    issue_type = instance.type or 'Bug'
    message = {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"*{instance.created_by} created a {issue_type}*\n*<{os.environ.get('APP_NAME')}project/{instance.project_id}/browse/issue/{instance.id}|{instance.name}>*"
                }
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": f"Status:\n *{issue_status}*"
                    },
                    {
                        "type": "mrkdwn",
                        "text": f"Type:\n *{issue_type}*"
                    },
                    {
                        "type": "mrkdwn",
                        "text": f"Assignee:\n *{instance.created_by}*"
                    },
                    {
                        "type": "mrkdwn",
                        "text": f"Priority:\n *{issue_priority}*"
                    }
                ]
            }
        ]
    }

    send_slack_notification(slack_config, message)


def send_task_status_notification(instance, old_status, new_status):
    slack_config = fetch_slack_config(instance.project_id)
    if not slack_config['url']:
        return
    issue_type = instance.type.__str__().upper() or 'BUG'
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
                    "text": f"*<{os.environ.get('APP_NAME')}project/{instance.project_id}/browse/issue/{instance.id}|{instance.name}>*"
                }
            }
        ]
    }
    send_slack_notification(slack_config, message)


def send_task_assignee_notification(instance, old_assignee, new_assignee):
    slack_config = fetch_slack_config(instance.project_id)
    if not slack_config['url']:
        return
    issue_type = instance.type.__str__().upper() or 'BUG'
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
                    "text": f"*<{os.environ.get('APP_NAME')}project/{instance.project_id}/browse/issue/{instance.id}|{instance.name}>*"
                }
            }
        ]
    }
    send_slack_notification(slack_config, message)


def fetch_slack_config(product_id):
    url = ''
    channel = ''
    try:
        local_instance = ProjectSlackWebhook.objects.get(project=product_id)
    except ProjectSlackWebhook.DoesNotExist:
        local_instance = None
    try:
        global_instance = GlobalSlackConfig.objects.get()
    except GlobalSlackConfig.DoesNotExist:
        global_instance = None

    if local_instance and local_instance.is_active:
        if local_instance.webhook_url:
            url = local_instance.webhook_url
        elif global_instance and global_instance.is_active:
            url = global_instance.webhook_url
        if local_instance.webhook_channel:
            channel = local_instance.webhook_url
        elif global_instance and global_instance.is_active:
            channel = global_instance.webhook_channel
        return {
            'url': url,
            'channel': channel
        }
    if global_instance and global_instance.is_active:
        url = global_instance.webhook_url
        channel = global_instance.webhook_channel
    return {
        'url': url,
        'channel': channel
    }


def send_slack_notification(slack_config, message):
    channel = slack_config['channel']
    headers = {
        "Content-Type": "application/json"
    }

    if isinstance(channel, str) and channel.strip():
        message['channel'] = channel

    s = requests.Session()
    response = s.post(slack_config['url'], headers=headers, json=message)
    if response.status_code == 200:
        return
    else:
        return
