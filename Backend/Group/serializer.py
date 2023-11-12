from dataclasses import fields
from rest_framework import serializers
from .models import Group, Post, Comment

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

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['caption', 'image', 'hobby']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['comment']