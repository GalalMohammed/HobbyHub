from dataclasses import fields
from rest_framework import serializers

from Hobby.models import Hobby
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
    icon = serializers.ImageField()
    joined = serializers.SerializerMethodField()

    def get_joined(self, obj):
        return obj.members.filter(id=self.context['request'].user.hobby_user.id).exists()
    
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
    class Meta:
        model = Post
        fields = ['id', 'caption', 'image', 'hobby', 'user', 'comments']

class CreatePostSerializer(serializers.ModelSerializer):
    hobby = serializers.SlugRelatedField(slug_field='name', queryset=Hobby.objects.all())
    class Meta:
        model = Post
        fields = ['caption', 'image', 'hobby', 'user']
