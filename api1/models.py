from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.deletion import CASCADE
from django.contrib.auth.models import AbstractUser
from rest_framework.serializers import ALL_FIELDS
#from ckeditor.fields import RichTextField

# Create your models here.
class User(AbstractUser):
    username=models.CharField(max_length=100 , unique=True)
    fullname=models.CharField(max_length=100)
    admin=models.BooleanField(default=False)
   
    def __str__(self):
        return self.username


class Project(models.Model):
    name=models.CharField(max_length=100)
    status=models.BooleanField(default=False)
    members=models.ManyToManyField(User)
    def __str__(self):
        return self.name


class List(models.Model):
    name=models.CharField(max_length=100)
    projectlist=models.ForeignKey(Project , on_delete=models.CASCADE,related_name="all_list" )   
    def __str__(self):
        return self.name 


class Cards(models.Model):
    task=models.CharField(max_length=100)
    list=models.ForeignKey(List , on_delete=CASCADE ,related_name="all_cards")
    done=models.BooleanField(default=False)
    user=models.ManyToManyField(User)
    def __str__(self):
        return self.task 

class Comment(models.Model):
    Comment=models.CharField(max_length=100)
    #user=models.ForeignKey(User , on_delete=CASCADE, related_name="all_comment")
    card=models.ForeignKey(Cards,on_delete=CASCADE,related_name="all_comment" )
    