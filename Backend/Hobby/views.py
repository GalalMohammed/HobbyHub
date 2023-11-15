from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Category, Hobby
from .serializer import CategorySerializer, HobbySerializer
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def getCategories(request):
    """
    Retrieve a list of all categories.

    Parameters:
        request (HttpRequest): The HTTP request object.

    Returns:
        Response: The HTTP response object containing the serialized data of all categories.
    """
    return Response(CategorySerializer(Category.objects.all(), many=True).data)


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def getHobbies(request, category):
    """
    Retrieve a list of hobbies based on the specified category.
    Parameters:
        request (HttpRequest): The HTTP request object.
        category (str): The name of the category.
    Returns:
        Response: The HTTP response object containing the serialized data of the hobbies.
    """
    cat_obj = get_object_or_404(Category, name=category)
    hobbies = Hobby.objects.filter(category=cat_obj.id)
    return Response(HobbySerializer(hobbies, many=True).data)