from django.db import models

class Paciente(models.Model):
    nombre = models.CharField(max_length=150)
    dni = models.CharField(max_length=20, unique=True)
    fecha_nacimiento = models.DateField()
    telefono = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"{self.nombre} ({self.dni})"

class RegistroMedico(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='registros')
    fecha = models.DateTimeField(auto_now_add=True)
    motivo = models.CharField(max_length=255)
    descripcion = models.TextField()
    analisis_ia = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Consulta: {self.paciente.nombre} - {self.fecha.date()}"  