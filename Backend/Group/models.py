from django.db import models
from Hobby.models import Hobby, Category
from users.models import HobbyUser


# Create your models here.
class Group(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.ImageField(upload_to='Group_pic', null=True, default='defult.jpg')
    backGround = models.ImageField(upload_to='Group_pic', null=True, default='defult.jpg')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=False, related_name='groups')
    members = models.ManyToManyField(HobbyUser, blank=True, related_name='groups')

    def __str__(self):
        return self.name
    
class Post(models.Model):
    caption = models.TextField()
    image = models.ImageField(upload_to='Post_pic', null=True, default='defult.jpg')
    group = models.ForeignKey(Group, on_delete=models.CASCADE, null=False, related_name='posts')
    hobby = models.ForeignKey(Hobby, on_delete=models.CASCADE, null=False)
    user = models.ForeignKey(HobbyUser, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.caption
    
class Comment(models.Model):
    text = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=False, related_name='comments') 
    user = models.ForeignKey(HobbyUser, on_delete=models.CASCADE, null=True)