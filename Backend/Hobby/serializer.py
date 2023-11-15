from dataclasses import fields
from rest_framework import serializers
from .models import Category, Hobby
from django.conf import settings

class CategorySerializer(serializers.ModelSerializer):
    icon_url = serializers.SerializerMethodField()
    class Meta:
        model = Category
        fields = ['name', 'icon_url']

    def get_icon_url(self, obj):
        if obj.icon:
            return f"http://localhost:8000{obj.icon.url}"
        else:
            return None

class HobbySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = Hobby
        fields = ['name', 'category', 'image_url']

    def get_image_url(self, obj):
        if obj.image:
            return f"http://localhost:8000{obj.image.url}"
        else:
            return None