from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)
    icon = models.ImageField(upload_to='Category_pic', null=True, default='defult.jpg')

    def __str__(self) -> str:
        return self.name

class Hobby(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='Hobby_pic', null=True, default='defult.jpg')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=False, related_name='hobbies')

    def __str__(self) -> str:
        return self.name