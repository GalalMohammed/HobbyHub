from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Group, Post, Comment
from Hobby.models import Category
from .serializer import GroupSerializer, UserGroupSerializer, RetrivePostSerializer, RetriveCommentSerializer, CreatePostSerializer, AddCommentSerializer
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def getGroups(request, category):
    """
    Retrieves a list of groups based on the specified category.

    Parameters:
        request (Request): The HTTP request object.
        category (str): The name of the category.

    Returns:
        Response: A response containing a serialized list of groups.
    """
    cat_obj = get_object_or_404(Category, name=category)
    groups = Group.objects.filter(category=cat_obj.id)
    return Response(UserGroupSerializer(groups, many=True, context={'request': request}).data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def getGroup(request, group_id):
    """
    Retrieves a group based on the specified group ID.
    Parameters:
        request (Request): The HTTP request object.
        group_id (int): The ID of the group.
    Returns:
        Response: A response containing a serialized group.
    """
    group = get_object_or_404(Group, id=group_id)
    return Response(UserGroupSerializer(group, context={'request': request}).data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def user_groups(request):
    user = request.user
    groups = Group.objects.filter(members__user=user)
    #data = [{'name': group.name, 'description': group.description} for group in groups]
    return Response(GroupSerializer(groups, many=True, context={'request': request}).data)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def joinGroup(request, group_id):
    """
    Joins a group based on the specified group ID.
    Parameters:
        request (Request): The HTTP request object.
        group_id (int): The ID of the group.
    Returns:
        Response: A response containing a serialized group.
    """
    group = get_object_or_404(Group, id=group_id)
    group.members.add(request.user.hobby_user)
    return Response(UserGroupSerializer(group, context={'request': request}).data)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def leaveGroup(request, group_id):
    """
    Leaves a group based on the specified group ID.
    Parameters:
        request (Request): The HTTP request object.
        group_id (int): The ID of the group.
    Returns:
        Response: A response containing a serialized group.
    """
    group = get_object_or_404(Group, id=group_id)
    group.members.remove(request.user.hobby_user)
    return Response(UserGroupSerializer(group, context={'request': request}).data)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def createPost(request, group_id):
    """
    Creates a post in a group based on the specified group ID.
    Parameters:
        request (Request): The HTTP request object.
        group_id (int): The ID of the group.
    Returns:
        Response: A response containing a serialized post.
    """
    group = get_object_or_404(Group, id=group_id)
    if not group.members.filter(id=request.user.hobby_user.id).exists():
        return Response({"message": "You are not a member of this group"}, status=status.HTTP_403_FORBIDDEN)
    serializer = CreatePostSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        post = serializer.save(group=group, user=request.user.hobby_user)
        return Response(RetrivePostSerializer(post).data)
    return Response(serializer.errors)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def addComment(request, post_id):
    """
    Adds a comment to a post based on the specified post ID.
    Parameters:
        request (Request): The HTTP request object.
        post_id (int): The ID of the post.
    Returns:
        Response: A response containing a serialized comment.
    """
    post = get_object_or_404(Post, id=post_id)
    if not post.group.members.filter(id=request.user.hobby_user.id).exists():
        return Response({"message": "You are not a member of this group"}, status=status.HTTP_403_FORBIDDEN)
    serializer = AddCommentSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save(post=post, user=request.user.hobby_user)
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def getPosts(request, group_id):
    """
    Retrieves a list of posts in a group based on the specified group ID.
    Parameters:
        request (Request): The HTTP request object.
        group_id (int): The ID of the group.
    Returns:
        Response: A response containing a list of serialized posts.
    """
    group_obj = get_object_or_404(Group, id=group_id)
    posts = Post.objects.filter(group=group_obj.id)
    return Response(RetrivePostSerializer(posts, many=True).data)