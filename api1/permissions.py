from rest_framework import permissions 


class Is_Admin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.admin == True:
            return True
        return False

class Is_Proj_Access(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        for person in obj.members.all():
            if person == request.user:
                return True
       
        return False

class Is_list_Access(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        for person in obj.projectlist.members.all():
            if person == request.user:
                return True
       
        return False        


class Is_Card_Access(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        for person in obj.list.projectlist.members.all():
            if person == request.user:
                return True
       
        return False             