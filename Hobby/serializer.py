from dataclasses import fields
from rest_framework import serializers
from .models import Category, Hobby

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']

class HobbySerializer(serializers.ModelSerializer):
    class Meta:
        model = Hobby
        fields = ['name', 'image', 'category']