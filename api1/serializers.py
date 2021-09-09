from django.db.models import fields
from .models import Comment, User , Project , List , Cards 
from rest_framework import serializers

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comment
        fields=['Comment', 'card' ]

class CardsSerializer(serializers.ModelSerializer):
    all_comment=CommentSerializer(many=True , read_only=True)
    class Meta:
        model= Cards
        fields = ['id','task' , 'list' , 'done' , 'user', 'all_comment']  

class ListSerializer(serializers.ModelSerializer):
    all_cards=CardsSerializer(many=True,read_only=True)
    class Meta:
        model= List
        fields = ['id','name', 'projectlist','all_cards']

class ProjectSerializer(serializers.ModelSerializer):
    all_list=ListSerializer(many=True,read_only=True)
    class Meta:
        model= Project
        fields = ['id','name', 'status' ,'members','all_list']

class UserSerializer(serializers.ModelSerializer):
    projects= ProjectSerializer(many=True, read_only=True)
    class Meta:
        model=User
        fields=['id' , 'fullname' , 'username','projects']


        
    

class ListProjectSerializer(serializers.ModelSerializer):
    projectlist = ProjectSerializer()

    class Meta:
        model = List
        fields = ['id','projectlist']  

class CardsListSerializer(serializers.ModelSerializer):
    list = ListSerializer()

    class Meta:
        model = Cards
        fields = ['id','user','list']                   