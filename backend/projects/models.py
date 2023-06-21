from django.db import models
from django.contrib.auth.models import User, Group
from django.core.validators import URLValidator
from .validators import validate_file_size
from django.utils.text import slugify


class ProjectCategory(models.Model):
    category = models.CharField(max_length=255)

    def __str__(self):
        return self.category


class ProjectType(models.Model):
    project = models.ForeignKey(
        'Project',
        on_delete=models.CASCADE,
        related_name='types'
    )
    type = models.CharField(max_length=255, default='Bug')

    def __str__(self):
        return self.type


class ProjectStatus(models.Model):
    project = models.ForeignKey(
        'Project',
        on_delete=models.CASCADE,
        related_name='statuses'
    )
    status = models.CharField(max_length=255, default='In Progress')

    def __str__(self):
        return self.status


class ProjectSlackWebhook(models.Model):
    project = models.OneToOneField(
        'Project',
        on_delete=models.CASCADE,
        related_name='slack_webhook'
    )
    slack_webhook_url = models.URLField(validators=[URLValidator(schemes=['https'])])
    slack_webhook_channel = models.CharField(max_length=50)
    slack_notification_status = models.BooleanField()

    def __str__(self):
        return self.slack_webhook_url

    class Meta:
        ordering = ['slack_notification_status']


class ProjectSMTPWebhook(models.Model):
    SSL = "SSL"
    TLS = "TLS"
    SMTP_TYPE = [
        (SSL, "SSL"),
        (TLS, "TLS"),
    ]

    project = models.OneToOneField(
        'Project',
        on_delete=models.CASCADE,
        related_name='smtp_webhook'
    )
    hostname = models.CharField(max_length=255)
    port = models.IntegerField()
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    security_protocol = models.CharField(
        max_length=3,
        choices=SMTP_TYPE,
        default=SSL,
    )

    def __str__(self):
        return self.hostname

    class Meta:
        ordering = ['hostname']


class ProjectLabels(models.Model):
    project = models.ForeignKey(
        'Project',
        on_delete=models.CASCADE,
        related_name='labels'
    )
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class Project(models.Model):
    icon = models.ImageField(
        upload_to='attachments/projects/icons',
        blank=True,
        null=True,
        validators=[validate_file_size]
    )
    name = models.CharField(max_length=255)
    description = models.TextField()
    slug = models.SlugField(
        'shortcut',
        blank=True
    )
    key = models.CharField(
        max_length=100,
        blank=True
    )
    assignees = models.ManyToManyField(
        User,
        through='ProjectMembership',
        through_fields=('project','user'),
        related_name='projects_assignees'
    )
    category = models.ForeignKey(
        ProjectCategory,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name='project_category'
    )
    slack_webhook_url = models.OneToOneField(
        ProjectSlackWebhook,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name='project_slack_webhook_url'
    )
    smtp_webhook_url = models.OneToOneField(
        ProjectSMTPWebhook,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name='project_smtp_webhook_url'
    )
    project_lead = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='project_lead'
    )
    company = models.ForeignKey(
        'register.Company',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name', 'company']


class ProjectMembership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'project', 'group')


class Issue(models.Model):
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"
    ISSUES_PRIORITY = [
        (HIGH, "High"),
        (MEDIUM, "Medium"),
        (LOW, "Low"),
    ]

    name = models.CharField(max_length=255)
    summary = models.CharField(max_length=100)
    description = models.TextField()
    slug = models.SlugField(
        max_length=255,
        unique=True,
        blank=True
    )
    file = models.JSONField(
        blank=True,
        null=True,
        default=list
    )
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE
    )
    assignee = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=True,
        related_name='issues_assigned'
    )
    reporter = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='issues_reported'
    )
    estimate = models.FloatField(default=0.0)
    priority = models.CharField(
        max_length=6,
        choices=ISSUES_PRIORITY,
        default=HIGH,
    )
    type = models.ForeignKey(
        ProjectType,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name='project_type'
    )
    status = models.ForeignKey(
        ProjectStatus,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name='project_status'
    )
    label = models.ForeignKey(
        ProjectLabels,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name='project_label'
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        related_name='user2create'
    )
    updated_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        related_name='user2update'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug or self.project.name not in self.slug:
            self.slug = slugify(f"{self.project.name} - {self.pk}")
        super().save(*args, **kwargs)


class Meta:
    ordering = ['project', 'name']


class Comment(models.Model):
    body = models.TextField()
    issue = models.ForeignKey(
        Issue,
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} Commented on  {self.issue.name}"

    class Meta:
        ordering = ['body', 'user']


class WorkLog(models.Model):
    time_spent = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        error_messages={'time_spent': "Duration Field Format is not correct"}
    )
    comment = models.TextField(blank=True)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    issue = models.ForeignKey(
        Issue,
        on_delete=models.CASCADE,
        related_name='worklogs'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.issue.name

    class Meta:
        ordering = ['issue', 'time_spent']


class Watcher(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='watched_issues'
    )
    issue = models.ForeignKey(
        Issue,
        on_delete=models.CASCADE,
        related_name='watchers'
    )

    def __str__(self):
        return f"{self.user.username} watching {self.issue.summary}"

    class Meta:
        ordering = ['user', 'issue']
