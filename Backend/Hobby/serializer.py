from dataclasses import fields
from rest_framework import serializers
from .models import Category, Hobby
from django.conf import settings

class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for Category
    """
    icon_url = serializers.SerializerMethodField()
    class Meta:
        model = Category
        fields = ['name', 'icon_url']

    def get_icon_url(self, obj):
        """
        Returns the URL of the icon associated with the given object.
        Parameters:
            obj (object): The object containing the icon.
        Returns:
            str: The URL of the icon.
        """
        if obj.icon:
            return f"http://localhost:8000{obj.icon.url}"
        else:
            return None

class HobbySerializer(serializers.ModelSerializer):
    """
    Serializer for Hobby
    """
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = Hobby
        fields = ['name', 'category', 'image_url']

    def get_image_url(self, obj):
        """
        Returns the URL of the image associated with the given object.
        Parameters:
            obj (object): The object containing the image.
        Returns:
            str: The URL of the image.
        """
        if obj.image:
            return f"http://localhost:8000{obj.image.url}"
        else:
            return None