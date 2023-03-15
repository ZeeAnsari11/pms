import os
import random
import shutil

from django.conf import settings
from django.db import models
from django.contrib.auth.models import User


def get_default_avatar():
    default_avatars_dir = os.path.join(settings.MEDIA_ROOT, 'default_avatars')
    avatars = os.listdir(default_avatars_dir)
    default_image = random.choice(avatars)

    default_image_path = os.path.join(settings.MEDIA_ROOT, "default_avatars", default_image)
    user_image_path = os.path.join(settings.MEDIA_ROOT, "users_avatars", default_image)

    if not os.path.exists(user_image_path):
        shutil.copy(default_image_path, user_image_path)

    return 'users_avatars/' + default_image


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default=get_default_avatar(), upload_to='users_avatars')

    def __str__(self):
        return f'{self.user.username} Profile'
