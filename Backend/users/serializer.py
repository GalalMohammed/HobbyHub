from rest_framework import serializers
from django.contrib.auth.models import User
from .models import HobbyUser

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    """
    class Meta:
        model = User
        fields = ('username', 'password', 'email')

class UsersSerializer(serializers.ModelSerializer):
    """
    Serializer for the Users model.
    """
    class Meta:
        model = User
        fields = ('id', 'username')

class HobbyUserSerializer(serializers.ModelSerializer):
    """
    Serializer for the HobbyUser model.
    """
    user = serializers.SlugRelatedField(slug_field='username', queryset=User.objects.all())
    class Meta:
        model = HobbyUser
        fields = ('user', 'id')
    
    # def get_icon_url(self, obj):
    #     """
    #     Returns the URL of the icon associated with the given object.

    #     Parameters:
    #         obj (Object): The object for which to retrieve the icon URL.

    #     Returns:
    #         str or None: The URL of the icon if it exists, None otherwise.
    #     """
    #     if obj.icon:
    #         return f"http://localhost:8000{obj.icon.url}"
    #     else:
    #         return None