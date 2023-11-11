from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Group, Post, Comment
from Hobby.models import Category
from .serializer import GroupSerializer, PostSerializer, CommentSerializer
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def getGroups(request, category):
    cat_obj = get_object_or_404(Category, name=category)
    groups = Group.objects.filter(category=cat_obj.id)
    return Response(GroupSerializer(groups, many=True).data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def getGroup(request, group_id):
    group = get_object_or_404(Group, id=group_id)
    return Response(GroupSerializer(group).data)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def createPost(request, group_id):
    group = get_object_or_404(Group, id=group_id)
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(group=group)
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def getPosts(request, group_id):
    group_obj = get_object_or_404(Group, id=group_id)
    posts = Post.objects.filter(group=group_obj.id)
    return Response(PostSerializer(posts, many=True).data)