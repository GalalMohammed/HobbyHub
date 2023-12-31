# Generated by Django 4.2.6 on 2023-11-02 15:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Hobby', '0004_alter_hobby_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('icon', models.ImageField(default='defult.jpg', null=True, upload_to='Group_pic')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='groups', to='Hobby.category')),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('caption', models.TextField()),
                ('image', models.ImageField(default='defult.jpg', null=True, upload_to='Post_pic')),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='Group.group')),
                ('hobby', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Hobby.hobby')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='Group.post')),
            ],
        ),
    ]
