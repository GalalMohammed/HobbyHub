from django.db import models

# Create your models here.
class Category(models.Model):
    """
    Category model
    name: name of the category
    icon: image of the category
    """
    name = models.CharField(max_length=100)
    icon = models.ImageField(upload_to='Category_pic', null=True, default='defult.jpg')

    def __str__(self) -> str:
        """
        String representation of the Category object.
        :return: string representation of the Category object.
        """
        return self.name

class Hobby(models.Model):
    """
    Model representing a hobby.
    name: name of the hobby
    image: image of the hobby
    category: category of the hobby
    """
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='Hobby_pic', null=True, default='defult.jpg')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=False, related_name='hobbies')

    def __str__(self) -> str:
        """
        String representation of the Hobby object.
        :return: string representation of the Hobby object.
        """
        return self.name