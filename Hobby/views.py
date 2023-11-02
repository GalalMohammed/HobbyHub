from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Category, Hobby
from .serializer import CategorySerializer, HobbySerializer

# Create your views here.
@api_view(['GET'])
def getCategories(request):
    return Response(CategorySerializer(Category.objects.all(), many=True).data)

@api_view(['GET'])
def getHobbies(request, category):
    cat_obj = get_object_or_404(Category, name=category)
    hobbies = Hobby.objects.filter(category=cat_obj.id)
    return Response(HobbySerializer(hobbies, many=True).data)