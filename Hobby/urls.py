from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.getCategories),
    path('categories/<category>/hobbies/', views.getHobbies),
]