from rest_framework import serializers
from django.contrib.auth.models import User
from .models import HobbyUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')

class HobbyUserSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field='username', queryset=User.objects.all())
    class Meta:
        model = HobbyUser
        fields = ('user', )