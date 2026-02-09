from django.contrib import admin
from .models import Paciente, RegistroMedico

admin.site.register(Paciente)
admin.site.register(RegistroMedico)