from django.db.models.query import QuerySet
from django.shortcuts import render
import json
from django.http.response import JsonResponse
from django.shortcuts import redirect, render
from django.http import HttpResponse, Http404
from django.template import loader
from django.urls import path
from requests.api import request
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import authentication, permissions, serializers ,viewsets

from .models import Comment, User , Project , List , Cards
from django.http import JsonResponse
from .serializers import UserSerializer , ProjectSerializer ,ListSerializer , CardsSerializer , ListProjectSerializer , CommentSerializer
from rest_framework.decorators import action
from rest_framework.views import APIView
from .permissions import Is_Admin , Is_Proj_Access , Is_list_Access , Is_Card_Access


#from decouple import config
#from tracker_app.models import *
import requests
from django.contrib.auth import authenticate, login
from rest_framework.permissions import IsAuthenticated

# Create your views here.

CLIENT_ID= "elJICPsYXpNkImpEJoKAQtZarxge582BWEDCaIyE"
CLIENT_SECRET_ID= "HFosGRMQFPUWARaueF487yCnXvhAWvkjisJ91CY63zFEckPGqLtHFa7Oayvsokh7CR6OrLVKramMgRIRHkq9XYI3p9I2wr3lqVkOUjLV885eLWhwYkkJ2kWI9gXzMTgh"
REDIRECT_URI="http://127.0.0.1:8000/api1/Synergy/"
TOKEN_URL = "https://channeli.in/open_auth/token/"
CLIENT_URL = "https://channeli.in/oauth/authorise"
GET_URL="https://channeli.in/open_auth/get_user_data/"
user_data={"userId":12813,"username":"2011","person":{"shortName":"","fullName":" Mishra","roles":[{"role":"Student","activeStatus":"ActiveStatus.IS_ACTIVE"},{"role":"Maintainer","activeStatus":"ActiveStatus.IS_ACTIVE"}],"displayPicture":"null"},"student":{"currentYear":2,"branch name":"B.Tech. (Electronics & Communication Engineering)"},"contactInformation":{"emailAddress":"parthsarthimishrapsm@gmail.com"}}

@api_view()

def index(request):
    # user_json=user_data.json()
    current_user= str(request.user)
    my_projects= Project.objects.filter(members__username=current_user)
    all_projects=Project.objects.all()
    all_project_serialized=ProjectSerializer(all_projects,many=True)
    my_project_serialized=ProjectSerializer(my_projects,many=True)
    project_dict= {my_project_serialized.data , all_project_serialized.data}
    return JsonResponse(project_dict,safe=False)

def login_redirect(request):
     return redirect('{}?client_id={}&redirect_uri={}'.format(CLIENT_URL, CLIENT_ID, REDIRECT_URI))
     #return HttpResponse(CLIENT_ID)

def LoginResponse(request):
    code = request.GET.get('code', '')
    post_data = {"client_id":"{}".format(CLIENT_ID),
                "client_secret":"{}".format(CLIENT_SECRET_ID),
                "grant_type":"authorization_code",
                "redirect_uri":"{}".format(REDIRECT_URI),
                "code":"{}".format(code)
                }
    token_info = requests.post("{}".format(TOKEN_URL), data=post_data)
    if(token_info.status_code == 200):
        token_json = token_info.json()
        user_data  = requests.get(GET_URL, headers={"Authorization": "{} {}".format(token_json["token_type"], token_json["access_token"])})
        
        user_json = user_data.json()
        # return JsonResponse(user_json)
        if(user_json["person"]["roles"][1]["role"] == "Maintainer" and user_json["person"]["roles"][1]["activeStatus"] == "ActiveStatus.IS_ACTIVE"):
            try:
                get_user = User.objects.get(username=user_json["username"])
                
            except User.DoesNotExist:
                User.objects.create(username=user_json["username"] , fullname=user_json["person"]["fullName"])
            get_user = User.objects.get(username=user_json["username"])
            
            
            login(request, get_user)
            
            return redirect("http://127.0.0.1:8000/api1/project/")
          # return JsonResponse(user_json)
        else:  
            raise Http404("Not a maintainer")
    else:
        raise Http404("Authentication Failed")   



# @api_view(['POST','GET'])   
# def hello_world(request):
#     if request.method == 'GET':

#     #     id=request.data.get('id')
#     #     if id is not None:
#     #         user = User.objects.get(id=id)
#     #         serializer = UserSerializer(user)
#     #         return Response(serializer.data)

#     if request.method == "POST":
#         #print(request.data)
#         return HttpResponse({'msg':'this is get','data':request.data})  
class ProjectViewset(viewsets.ModelViewSet):
    serializer_class= ProjectSerializer
    # queryset=Project.objects.all()
    # @action(methods=['GET'], detail = False, url_path='lists',url_name='projects-lists')
    # def show_list(self,request,pk=None,format=None):
    #     pk=2
    #     get_i=Project.objects.get(id=pk)
        
    #     list=List.objects.filter(project=get_i)
    #     serializers=ListSerializer(list,many=True)
       
    #     return Response(serializers.data)
        
         
    def get_queryset(self):
        project_data = Project.objects.all()
        
        current_user= str(self.request.user)
        return Project.objects.filter(members__username=current_user)


# class ListViewset(viewsets.ModelViewSet):
#     serializer_class=ListSerializer
#     def get_queryset(self):
#         List_data=List.objects.all()
        
#         return List.objects.all() 

class CardsViewset(viewsets.ModelViewSet):
    serializer_class=CardsSerializer
    def get_queryset(self):
        Cards_data=Cards.objects.all()
        
        return Cards_data 

class CommentViewset(viewsets.ModelViewSet):
    serializer_class=CommentSerializer
    def get_queryset(self):
        Comment_data=Comment.objects.all()
        
        return Comment_data         


class ListOfProjects(viewsets.ModelViewSet):
    serializer_class=ProjectSerializer

    permission_classes=[Is_Proj_Access,IsAuthenticated]
    queryset = Project.objects.all()

class CardsOfList(viewsets.ModelViewSet):
    permission_classes=[Is_list_Access,IsAuthenticated]
    serializer_class=ListSerializer
    queryset = List.objects.all()  

class CommentOfCards(viewsets.ModelViewSet):
    permission_classes=[Is_Card_Access , IsAuthenticated]
    serializer_class=CardsSerializer
    queryset = Cards.objects.all()   

class UserViewSet(viewsets.ModelViewSet):
    serializer_class=UserSerializer
    permission_classes= [Is_Admin,IsAuthenticated]
    def get_queryset(self):
        User_data=User.objects.all()
        
        return User_data
                    
    
  

    # def get(self, request, pk ,format=None):
    #     proj = Project.objects.get(id=pk)
    #     serializer = ProjectSerializer(List.objects.filter(projectlist = proj))
    #     return JsonResponse(serializer.data)