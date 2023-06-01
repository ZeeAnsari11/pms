from django.db import models, transaction
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from .validators import validate_file_size
from django.utils.text import slugify
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.


class ProjectCategory(models.Model):
    project_category = models.CharField(max_length=255)

    def __str__(self):
        return self.project_category


class IssuesPriority(models.Model):
    issue_priority = models.CharField(max_length=255)

    def __str__(self):
        return self.issue_priority


class ProjectType(models.Model):
    project = models.ForeignKey('Project', on_delete=models.CASCADE, related_name='types')
    type = models.CharField(max_length=255)

    def __str__(self):
        return self.type


class ProjectStatus(models.Model):
    project = models.ForeignKey('Project', on_delete=models.CASCADE, related_name='statuses')
    status = models.CharField(max_length=255)

    def __str__(self):
        return self.status


class ProjectLabels(models.Model):
    project = models.ForeignKey('Project', on_delete=models.CASCADE, related_name='labels')
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=10)

    def __str__(self):
        return self.name


# class Attachment(models.Model):
#     issue = models.ForeignKey('Issue', on_delete=models.CASCADE, related_name='attachments')
#     file = models.FileField(upload_to='attachments/issues/', validators=[validate_file_size])
#
#     def __str__(self):
#         return self.file.name


class Project(models.Model):
    icon = models.ImageField(upload_to='attachments/projects/icons', blank=True, null=True,
                             validators=[validate_file_size])
    name = models.CharField(max_length=255)
    slug = models.SlugField('shortcut', blank=True)
    key = models.CharField(max_length=100, blank=True)
    assignee = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, related_name='projects_assigned')
    type = models.ForeignKey(ProjectType, on_delete=models.CASCADE, blank=True, null=True,
                             related_name='project_type')

    status = models.ForeignKey(ProjectStatus, on_delete=models.CASCADE, blank=True, null=True,
                               related_name='project_status')

    label = models.ForeignKey(ProjectLabels, on_delete=models.CASCADE, blank=True, null=True,
                              related_name='project_label')

    project_lead = models.ForeignKey(User, on_delete=models.CASCADE, related_name='project_lead')
    description = models.TextField()
    company = models.ForeignKey('register.Company', on_delete=models.CASCADE, default=1)
    project_category = models.ForeignKey(ProjectCategory, on_delete=models.PROTECT, blank=True, null=True)

    def __str__(self):
        return (self.name)

    class Meta:
        ordering = ['name', 'company']


class Issue(models.Model):
    name = models.CharField(max_length=255)
    summary = models.CharField(max_length=100)
    description = models.TextField()
    # file = models.FileField(upload_to='attachments/issues/', blank=True, null=True, validators=[validate_file_size])

    file = models.JSONField(blank=True, null=True,
                            default=list)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    assignee = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, related_name='issues_assigned')
    reporter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='issues_reported')

    estimate = models.FloatField(default=0.0)

    priority = models.ForeignKey(IssuesPriority, on_delete=models.PROTECT, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug or self.project.name not in self.slug:
            self.slug = slugify(f"{self.project.name} - {self.pk}")
        super().save(*args, **kwargs)


@receiver(post_save, sender=Issue)
def post_save_issue(sender, instance, created, **kwargs):
    if created:
        @transaction.on_commit
        def update_slug():
            if not instance.slug or instance.project.name not in instance.slug:
                instance.slug = slugify(f"{instance.project.name} - {instance.pk}")
                instance.save()


class Meta:
    ordering = ['project', 'name']


class Comment(models.Model):
    body = models.TextField()
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} Commented on  {self.issue.name}"

    class Meta:
        ordering = ['body', 'user']


class WorkLog(models.Model):
    time_spent = models.DecimalField(max_digits=6, decimal_places=2,
                                     error_messages={'time_spent': "Duration Field Format is not correct"})
    comment = models.TextField(blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='worklogs')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.issue.name

    class Meta:
        ordering = ['issue', 'time_spent']


class Watcher(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='watched_issues')
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='watchers')

    def __str__(self):
        return f"{self.user.username} watching {self.issue.summary}"

    class Meta:
        ordering = ['user', 'issue']
