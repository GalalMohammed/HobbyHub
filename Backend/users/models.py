from django.db import models
from django.contrib.auth.models import User
from Hobby.models import Hobby

class HobbyUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='hobby_user')
    hobbies = models.ManyToManyField(Hobby, blank=True, related_name='users')

    def __str__(self):
        return self.user.username