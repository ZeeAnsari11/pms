from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from .validators import validate_file_size


# Create your models here.


class Project(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField('shortcut', blank=True)
    assignee = models.ManyToManyField(User)
    description = models.TextField()
    company = models.ForeignKey('register.Company', on_delete=models.CASCADE, default=1)
    PROJECT_CATEGORY_DEFAULT = 'Software'
    PROJECT_CATEGORY_CHOICES = [
        ('Software', 'Software'),
        ('Marketing', 'Marketing'),
        ('Business', 'Business')
    ]
    project_category = models.CharField(
        max_length=50,
        choices=PROJECT_CATEGORY_CHOICES, default=PROJECT_CATEGORY_DEFAULT
    )
    def __str__(self):
        return (self.name)

    class Meta:
        ordering = ['name', 'company']


class Issue(models.Model):
    name = models.CharField(max_length=255)
    summary = models.CharField(max_length=100)
    description = models.TextField()
    file = models.FileField(upload_to='attachments/issues/', blank=True, null=True, validators=[validate_file_size])
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    assignee = models.ManyToManyField(User, related_name='issues_assigned')
    reporter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='issues_reported')
    ISSUE_TYPE_DEFAULT = 'Task'

    ISSUE_TYPE_CHOICES = [
        ('Task', 'Task'),
        ('Bug', 'Bug'),
        ('Story', 'Story')
    ]
    type = models.CharField(
        max_length=50,
        choices=ISSUE_TYPE_CHOICES, default=ISSUE_TYPE_DEFAULT
    )

    ISSUE_STATUS_DEFAULT = 'Backlog'

    ISSUE_STATUS_CHOICES = [
        ('Backlog', 'Backlog'),
        ('Selected For development', 'Selected For development'),
        ('InProgress', 'InProgress'),
        ('Done', 'Done')
    ]
    status = models.CharField(
        max_length=50,
        choices=ISSUE_STATUS_CHOICES, default=ISSUE_STATUS_DEFAULT
    )
    ISSUE_PRIORITY_DEFAULT = 'Medium'

    ISSUE_PRIORITY_CHOICES = [
        ('Highest', 'Highest'),
        ('High', 'High'),
        ('Medium', 'Medium'),
        ('Low', 'Low'),
        ('Lowest', 'Lowest')
    ]

    priority = models.CharField(
        max_length=50, choices=ISSUE_PRIORITY_CHOICES, default=ISSUE_PRIORITY_DEFAULT
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

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
