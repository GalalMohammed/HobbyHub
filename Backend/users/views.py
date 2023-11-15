from django.shortcuts import render
from .serializer import UserSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import HobbyUser
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
def register(request):
    """
    Register a new user.

    Parameters:
        - request: The HTTP request object containing user data.

    Returns:
        - A JSON response containing the user's authentication token if registration is successful.
        - A JSON response containing the error message if registration fails.
    """
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        hobbyuser = HobbyUser(user=user)
        hobbyuser.save()
        token = Token.objects.create(user=user)
        return Response({"token": token.key})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def login(request):
    """
    Login a user.
    Parameters:
        - request: The HTTP request object containing user data.
    Returns:
        - A JSON response containing the user's authentication token if login is successful.
        - A JSON response containing the error message if login fails.
    """
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response("user not found", status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(user)    
    return Response({"token": token.key, "user": serializer.data})


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def user(request):
    """
    Get the current user's data.
    Parameters:
        - request: The HTTP request object.
    Returns:
        - A JSON response containing the current user's username.
    """
    serializer = UserSerializer(request.user)
    return Response({"username": request.user.username})
    
