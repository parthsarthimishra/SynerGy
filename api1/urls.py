"""synergy URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path 
from django.conf.urls import url , include
from .views import LoginResponse, index, login_redirect ,UserViewSet, ProjectViewset , CardsViewset,CommentViewset, ListOfProjects , CardsOfList , CommentOfCards
#import views 
from rest_framework.routers import DefaultRouter
# from rest_framework_nested import routers
app_name="api1"
router=DefaultRouter()
router.register('projectsAll',ProjectViewset, basename='projects')
router.register(r'project',ListOfProjects)
router.register(r'list',CardsOfList)
router.register(r'card',CommentOfCards)
# list_router=routers.NestedSimpleRouter(router,r'projects' , lookup='list')
# list_router.register(r'lists' , ListViewset )
# router.register('lists',ListViewset, basename='List_data')
router.register('cards',CardsViewset, basename='Card_data')
router.register('comments',CommentViewset, basename='Comment_data')
router.register('Users',UserViewSet, basename='User_data')

urlpatterns = [
    
    path('dashboard/', index),
    path('login/', login_redirect),
    path('Synergy/', LoginResponse),
    # path('projects', ListOfProjects.as_view()),
    url('',include(router.urls))
    # path('hello_world/' , hello_world)
]
