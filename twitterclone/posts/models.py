from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    content = models.CharField(max_length=80)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(null=True)

    def __str__(self):
        """A string representation of the model."""
        return self.content

class Like(models.Model):
    liker = models.ForeignKey(User, on_delete=models.CASCADE)
    liked_post = models.ForeignKey(Post, on_delete=models.CASCADE)