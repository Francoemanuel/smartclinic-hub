from django.db import models
from pacientes.models import Paciente

class Especialidad(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    def __str__(self): return self.nombre

class Medico(models.Model):
    nombre = models.CharField(max_length=100)
    especialidad = models.ForeignKey(Especialidad, on_delete=models.CASCADE)
    matricula = models.CharField(max_length=50, unique=True)
    def __str__(self): return f"Dr. {self.nombre}"

class Turno(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)
    fecha_hora = models.DateTimeField()
    motivo = models.CharField(max_length=255)
    completado = models.BooleanField(default=False)