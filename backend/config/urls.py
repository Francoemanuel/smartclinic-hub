from django.contrib import admin
from django.urls import path
from .api import api # Importa el objeto api que acabas de crear

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api.urls), # Toda nuestra API vivirá en /api/
]
