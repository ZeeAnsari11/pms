from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from . import serializers
from .models import Company


# Create your views here.

class CompanyViewSet(ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = serializers.CompanySerializer
