from django.urls import path

from . import views

urlpatterns = [
    path('posts/', views.ListPost),
    path('posts/create/', views.CreatePost)
]