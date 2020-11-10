# todos/serializers.py
from datetime import datetime

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Post, Like


class PostSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('get_username')
    likes_num = serializers.SerializerMethodField('get_likes_num')
    js_timestamp = serializers.SerializerMethodField('get_js_timestamp')

    def unix_time_millis(self, dt):
        return dt

    def get_username(self, post):
        return post.creator.username

    def get_likes_num(self, post):
        return len(Like.objects.filter(liked_post=post))

    def get_js_timestamp(self, post):
        if not post.timestamp:
            return ""
        return post.timestamp.strftime("%m/%d/%Y, %H:%M:%S")

    class Meta:
        fields = (
            'id',
            'creator',
            'content',
            'username',
            'likes_num',
            'js_timestamp'
        )
        model = Post