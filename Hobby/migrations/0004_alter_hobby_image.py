# Generated by Django 4.2.6 on 2023-11-02 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Hobby', '0003_alter_hobby_category_alter_hobby_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hobby',
            name='image',
            field=models.ImageField(default='defult.jpg', null=True, upload_to='Hobby_pic'),
        ),
    ]
