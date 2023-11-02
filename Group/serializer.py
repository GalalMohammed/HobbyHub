from dataclasses import fields
from rest_framework import serializers
from .models import Group, Post, Comment

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name', 'description', 'icon', 'posts']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['caption', 'image', 'hobby']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['comment']