from django.db import models
from Hobby.models import Hobby, Category
from users.models import HobbyUser


# Create your models here.
class Group(models.Model):
    """
    Model representing a group.

    Attributes:
        name (str): The name of the group.
        description (str): The description of the group.
        icon (ImageField): The icon for the group.
        backGround (ImageField): The background image for the group.
        category (ForeignKey): The category of the group.
        members (ManyToManyField): The members of the group.
    """
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.ImageField(upload_to='Group_pic', null=True, default='defult.jpg')
    backGround = models.ImageField(upload_to='Group_pic', null=True, default='defult.jpg')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=False, related_name='groups')
    members = models.ManyToManyField(HobbyUser, blank=True, related_name='groups')

    def __str__(self):
        """
        String representation of the Group object.

        Returns:
            str: The name of the group.
        """
        return self.name
    
class Post(models.Model):
    """
    Model representing a post.

    Attributes:
        caption (str): The caption for the post.
        image (ImageField): The image associated with the post.
        group (ForeignKey): The group to which the post belongs.
        hobby (ForeignKey): The hobby associated with the post.
        user (ForeignKey): The user who created the post.
    """
    caption = models.TextField()
    image = models.ImageField(upload_to='Post_pic', null=True, default='defult.jpg')
    group = models.ForeignKey(Group, on_delete=models.CASCADE, null=False, related_name='posts')
    hobby = models.ForeignKey(Hobby, on_delete=models.CASCADE, null=False)
    user = models.ForeignKey(HobbyUser, on_delete=models.CASCADE, null=True)

    def __str__(self):
        """
        String representation of the Post object.

        Returns:
            str: The caption of the post.
        """
        return self.caption
    
class Comment(models.Model):
    """
    Model representing a comment.

    Attributes:
        text (str): The text content of the comment.
        post (ForeignKey): The post to which the comment belongs.
        user (ForeignKey): The user who posted the comment.
    """
    text = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=False, related_name='comments') 
    user = models.ForeignKey(HobbyUser, on_delete=models.CASCADE, null=True)