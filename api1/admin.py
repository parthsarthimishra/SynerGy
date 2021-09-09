from django.contrib import admin
from django.contrib.admin.options import ModelAdmin

from .models import Cards, Comment, List, User , Project
# Register your models here.
admin.site.register(User)
admin.site.register(Project)
admin.site.register(List)
admin.site.register(Cards)
admin.site.register(Comment)
