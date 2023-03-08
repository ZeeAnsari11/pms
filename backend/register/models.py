from django.db import models


# Create your models here.
class Company(models.Model):
    company_name = models.CharField(max_length=80)
    email = models.EmailField()
    city = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = 'Companies'
        ordering = ('company_name',)

    def __str__(self):
        return (self.company_name)