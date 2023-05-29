import os
import random
import shutil
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.utils.html import format_html

from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from django.core.exceptions import ValidationError



def get_default_avatar():
    default_avatars_dir = os.path.join(settings.MEDIA_ROOT, 'default_avatars')
    avatars = os.listdir(default_avatars_dir)
    default_image = random.choice(avatars)

    default_image_path = os.path.join(settings.MEDIA_ROOT, "default_avatars", default_image)
    user_image_path = os.path.join(settings.MEDIA_ROOT, "users_avatars", default_image)

    if not os.path.exists(user_image_path):
        shutil.copy(default_image_path, user_image_path)

    return 'users_avatars/' + default_image



def validate_date_format(value):
    try:
        datetime.datetime.strptime(value, '%Y-%m-%d')
    except ValueError:
        raise ValidationError('Invalid date format. The date must be in YYYY-MM-DD format.')



# class UserProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     image = models.ImageField(upload_to='users_avatars', default=get_default_avatar)
#
#     def image_tag(self):
#         return format_html('<img src="{}" style="width: 100px; height: 100px;" />'.format(self.image.url))
#
#     image_tag.short_description = 'Image Thumbnail'
#
#     def __str__(self):
#         return f'{self.user.username} Profile Avatar'
#
#
# @receiver(post_save, sender=User)
# def create_profile(sender, instance, created, **kwargs):
#     if created:
#         UserProfile.objects.create(user=instance)
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='users_avatars', default=get_default_avatar)
    company = models.ForeignKey('register.Company', on_delete=models.CASCADE, blank=True, null=True)
    department = models.CharField(max_length=100, default='')
    job_title = models.CharField(max_length=100, default='')
    joining_date = models.DateField(auto_now_add=True)

    def image_tag(self):
        return format_html('<img src="{}" style="width: 100px; height: 100px;" />'.format(self.image.url))

    image_tag.short_description = 'Image Thumbnail'

    def __str__(self):
        return f'{self.user.username} Profile Avatar'


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)