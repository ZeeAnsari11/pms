from django.contrib import admin
from . import models


class CompanyAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'email', 'city']
    search_fields = ['company_name', 'city']
    list_display_links = ['company_name']
    list_editable = ['email', 'city']


# Register your models here.
admin.site.register(models.Company, CompanyAdmin)
