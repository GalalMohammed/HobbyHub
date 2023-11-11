from django.urls import path
from . import views

urlpatterns = [
    path('categories/<category>/groups/', views.getGroups),
    path('groups/<int:group_id>/', views.getGroup),
    path('groups/<int:group_id>/post/', views.createPost),
    path('groups/<int:group_id>/posts/', views.getPosts),
]