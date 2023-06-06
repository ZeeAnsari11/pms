from django.contrib import admin
from .models import UserProfile


# Register your models here.

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'company', 'image', 'image_tag']
    autocomplete_fields = ['company']


admin.site.register(UserProfile, UserProfileAdmin)
