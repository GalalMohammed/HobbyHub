from dataclasses import fields
from rest_framework import serializers

from Hobby.models import Hobby, Category
from .models import Group, Post, Comment
from users.serializer import HobbyUserSerializer
from Hobby.serializer import HobbySerializer

class GroupSerializer(serializers.ModelSerializer):
    """
    Serializer for Group model.

    Serializes Group objects with specified fields.
    """
    icon_url = serializers.SerializerMethodField()
    class Meta:
        model = Group
        fields = ['id', 'name', 'description', 'icon_url', 'members']

    def get_icon_url(self, obj):
        """
        Returns the URL of the icon associated with the given object.

        Parameters:
            obj (Object): The object for which to retrieve the icon URL.

        Returns:
            str or None: The URL of the icon if it exists, None otherwise.
        """
        if obj.icon:
            return f"http://127.0.0.1:8000{obj.icon.url}"
        else:
            return None

class UserGroupSerializer(serializers.Serializer):
    """
    Serializer for UserGroup.

    Serializes detailed Group information including related data such as members, URLs, and joined status.
    """
    id = serializers.IntegerField()
    name = serializers.CharField()
    description = serializers.CharField()
    category = serializers.SlugRelatedField(slug_field='name', queryset=Category.objects.all())
    members = serializers.StringRelatedField(many=True)
    icon_url = serializers.SerializerMethodField()
    backGround_url = serializers.SerializerMethodField()
    joined = serializers.SerializerMethodField()

    def get_joined(self, obj):
        """
        Filter the members of the given object based on the ID of the hobby user associated with the current request and check if any members exist.

        Parameters:
            obj (Object): The object to filter the members from.

        Returns:
            bool: True if any members exist, False otherwise.
        """
        return obj.members.filter(id=self.context['request'].user.hobby_user.id).exists()
    
    def get_icon_url(self, obj):
        """
        Returns the URL of the icon associated with the given object.

        Parameters:
            obj (Object): The object for which to retrieve the icon URL.

        Returns:
            str or None: The URL of the icon if it exists, None otherwise.
        """
        if obj.icon:
            return f"http://127.0.0.1:8000{obj.icon.url}"
        else:
            return None
        
    def get_backGround_url(self, obj):
        """
        Returns the URL of the background image associated with the given object.
        
        Parameters:
            obj (object): The object containing the background image.
        
        Returns:
            str or None: The URL of the background image if it exists, or None if it doesn't.
        """
        if obj.backGround:
            return f"http://127.0.0.1:8000{obj.backGround.url}"
        else:
            return None
    
class RetriveCommentSerializer(serializers.ModelSerializer):
    """
    Serializer for retrieving Comments.

    Serializes Comment objects for retrieval, including user information.
    """
    user = HobbyUserSerializer()
    class Meta:
        model = Comment
        fields = ['text', 'user']

class AddCommentSerializer(serializers.ModelSerializer):
    """
    Serializer for adding Comments.

    Serializes Comment objects for adding new comments.
    """
    class Meta:
        model = Comment
        fields = ['text']

class RetrivePostSerializer(serializers.ModelSerializer):
    """
    Serializer for retrieving Posts.

    Serializes Post objects for retrieval, including hobby, user, comments, and image URLs.
    """
    hobby = serializers.SlugRelatedField(slug_field='name', queryset=Hobby.objects.all())
    user = HobbyUserSerializer()
    comments = RetriveCommentSerializer(many=True)
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ['id', 'caption', 'image', 'hobby', 'user', 'comments', 'image_url']

    def get_image_url(self, obj):
        """
        Returns the URL of the image associated with the given object.
        Args:
            obj (object): The object containing the image.
        Returns:
            str or None: The URL of the image if it exists, or None if it doesn't.
        """
        if obj.image:
            return f"http://127.0.0.1:8000{obj.image.url}"
        else:
            return None

class CreatePostSerializer(serializers.ModelSerializer):
    """
    Serializer for creating Posts.

    Serializes Post objects for creating new posts.
    """
    hobby = serializers.SlugRelatedField(slug_field='name', queryset=Hobby.objects.all())
    
    class Meta:
        model = Post
        fields = ['caption', 'image', 'hobby']    
