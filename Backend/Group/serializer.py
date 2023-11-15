from dataclasses import fields
from rest_framework import serializers

from Hobby.models import Hobby, Category
from .models import Group, Post, Comment
from users.serializer import HobbyUserSerializer
from Hobby.serializer import HobbySerializer

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name', 'description', 'icon']

class UserGroupSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    description = serializers.CharField()
    category = serializers.SlugRelatedField(slug_field='name', queryset=Category.objects.all())
    members = serializers.StringRelatedField(many=True)
    icon_url = serializers.SerializerMethodField()
    backGround_url = serializers.SerializerMethodField()
    joined = serializers.SerializerMethodField()

    def get_joined(self, obj):
        return obj.members.filter(id=self.context['request'].user.hobby_user.id).exists()
    
    def get_icon_url(self, obj):
        if obj.icon:
            return f"http://localhost:8000{obj.icon.url}"
        else:
            return None
        
    def get_backGround_url(self, obj):
        if obj.backGround:
            return f"http://localhost:8000{obj.backGround.url}"
        else:
            return None
    
class RetriveCommentSerializer(serializers.ModelSerializer):
    user = HobbyUserSerializer()
    class Meta:
        model = Comment
        fields = ['text', 'user']

class AddCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['text']

class RetrivePostSerializer(serializers.ModelSerializer):
    hobby = serializers.SlugRelatedField(slug_field='name', queryset=Hobby.objects.all())
    user = HobbyUserSerializer()
    comments = RetriveCommentSerializer(many=True)
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ['id', 'caption', 'image', 'hobby', 'user', 'comments', 'image_url']

    def get_image_url(self, obj):
        if obj.image:
            return f"http://localhost:8000{obj.image.url}"
        else:
            return None

class CreatePostSerializer(serializers.ModelSerializer):
    hobby = serializers.SlugRelatedField(slug_field='name', queryset=Hobby.objects.all())
    
    class Meta:
        model = Post
        fields = ['caption', 'image', 'hobby']

    
