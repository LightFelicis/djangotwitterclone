import json

from django.http import HttpResponse, JsonResponse
from rest_framework import generics
from rest_framework.authtoken.models import Token
from datetime import datetime

from .models import Post, Like
from .serializers import PostSerializer


def ListPost(request):
    queryset = Post.objects.order_by("-timestamp")[:10]
    serialized = PostSerializer(queryset, many=True);
    if request.headers['Authorization'] == 'null':
        return JsonResponse(serialized.data, safe=False)
    user = Token.objects.get(key=request.headers['Authorization']).user
    for record in serialized.data:
        post_id = record['id']
        if len(Like.objects.filter(liked_post=post_id).filter(liker=user)) > 0:
            record['liked'] = True
        else:
            record['liked'] = False
    return JsonResponse(serialized.data, safe=False)


def CreatePost(request):
    json_dict = json.loads(request.body)
    post_content, creator_token, timestamp = json_dict['post_content'], json_dict['creator_token'], json_dict[
        'timestamp']
    cleaned_timestamp = datetime.fromtimestamp(timestamp)
    tokens = Token.objects.filter(key=creator_token)
    if len(tokens) != 1:
        return HttpResponse(status=403)
    validated_user = tokens[0].user
    Post.objects.create(content=post_content, creator=validated_user, timestamp=cleaned_timestamp)
    return HttpResponse(status=201)


def CreateLike(request):
    json_dict = json.loads(request.body)
    liker_token, post_id = json_dict['token'], json_dict['id']
    post = Post.objects.get(id=post_id)
    user = Token.objects.filter(key=liker_token)[0].user
    Like.objects.create(liker=user, liked_post=post)
    return HttpResponse(status=201)


def DeleteLike(request):
    json_dict = json.loads(request.body)
    liker_token, post_id = json_dict['token'], json_dict['id']
    post = Post.objects.get(id=post_id)
    user = Token.objects.filter(key=liker_token)[0].user
    Like.objects.filter(liker=user).filter(liked_post=post).delete()
    return HttpResponse(status=201)

