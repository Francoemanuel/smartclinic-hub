import os
import django
import random
from datetime import timedelta
from django.utils import timezone

# Configuración de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from pacientes.models import Paciente, RegistroMedico
from gestion.models import Especialidad, Medico, Turno
from faker import Faker

fake = Faker(['es_ES']) # Datos en español

def populate_db():
    print("Iniciando poblado de base de datos...")

    # 1. Crear Especialidades
    especialidades_nombres = [
        'Cardiología', 'Pediatría', 'Dermatología', 'Neurología', 
        'Traumatología', 'Ginecología', 'Psiquiatría', 'Oftalmología', 
        'Gastroenterología', 'Urología'
    ]
    especialidades_objs = []
    for nombre in especialidades_nombres:
        esp, _ = Especialidad.objects.get_or_create(nombre=nombre)
        especialidades_objs.append(esp)
    print(f"✔ {len(especialidades_objs)} Especialidades creadas.")

    # 2. Crear Médicos
    medicos_objs = []
    for _ in range(15):
        medico = Medico.objects.create(
            nombre=f"Dr. {fake.name()}",
            especialidad=random.choice(especialidades_objs),
            matricula=f"MN-{fake.unique.random_number(digits=5)}"
        )
        medicos_objs.append(medico)
    print(f"✔ {len(medicos_objs)} Médicos creados.")

    # 3. Crear Pacientes
    pacientes_objs = []
    for _ in range(50):
        paciente = Paciente.objects.create(
            nombre=fake.name(),
            dni=str(fake.unique.random_number(digits=8)),
            fecha_nacimiento=fake.date_of_birth(minimum_age=0, maximum_age=90),
            telefono=fake.phone_number()
        )
        pacientes_objs.append(paciente)
    print(f"✔ {len(pacientes_objs)} Pacientes creados.")

    # 4. Crear Registros Médicos (Historial)
    motivos = ['Chequeo general', 'Dolor abdominal', 'Fiebre persistente', 'Control post-operatorio', 'Migrañas', 'Alergia estacional']
    for _ in range(100):
        paciente = random.choice(pacientes_objs)
        RegistroMedico.objects.create(
            paciente=paciente,
            motivo=random.choice(motivos),
            descripcion=fake.paragraph(nb_sentences=3)
        )
    print(f"✔ 100 Registros médicos creados.")

    # 5. Crear Turnos (algunos futuros, algunos pasados)
    for _ in range(50):
        paciente = random.choice(pacientes_objs)
        medico = random.choice(medicos_objs)
        # Fecha aleatoria entre hace 10 días y dentro de 10 días
        fecha_random = timezone.now() + timedelta(days=random.randint(-10, 10))
        
        Turno.objects.create(
            paciente=paciente,
            medico=medico,
            fecha_hora=fecha_random,
            motivo=random.choice(motivos),
            completado=random.choice([True, False])
        )
    print(f"✔ 50 Turnos creados.")
    print("\n🚀 Proceso finalizado con éxito.")

if __name__ == '__main__':
    populate_db()