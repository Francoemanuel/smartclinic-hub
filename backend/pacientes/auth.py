from ninja.security import HttpBasicAuth
from django.contrib.auth import authenticate

class BasicAuth(HttpBasicAuth):
    def authenticate(self, request, username, password):
        user = authenticate(username=username, password=password)
        if user and user.is_active:
            return user
        # Si no funciona, Django Ninja enviará un 401 por defecto