from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from . import serializers
from .models import Company


# Create your views here.

class CompanyViewSet(ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = serializers.CompanySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"
