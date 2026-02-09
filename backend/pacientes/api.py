from django.db.models import Q
from django.shortcuts import get_object_or_404
from .models import Paciente, RegistroMedico # Importamos ambos de una vez
from .auth import BasicAuth
from .schemas import PacienteIn, PacienteOut, RegistroIn, RegistroOut
from datetime import date, datetime 
from ninja import Router, Schema
from typing import List, Optional



# --- 2. CONFIGURACIÓN DEL ROUTER ---


router = Router()

# --- 3. ENDPOINTS DE PACIENTES ---

# Listar y buscar
@router.get("/", response=List[PacienteOut]) # <-- SIN barra, SIN nombre. Solo ""
def listar_pacientes(request, search: Optional[str] = None):
    if search:
        return Paciente.objects.filter(
            Q(nombre__icontains=search) | Q(dni__icontains=search)
        )
    return Paciente.objects.all()

@router.post("", response=PacienteOut) # <-- También ""
def crear_paciente(request, data: PacienteIn):
    paciente, _ = Paciente.objects.get_or_create(
        dni=data.dni,
        defaults=data.dict()
    )
    return paciente

# Editar paciente
@router.put("/{paciente_id}", response=PacienteOut)
def actualizar_paciente(request, paciente_id: int, data: PacienteIn):
    paciente = get_object_or_404(Paciente, id=paciente_id)
    for attr, value in data.dict().items():
        setattr(paciente, attr, value)
    paciente.save()
    return paciente

# Borrar paciente
@router.delete("/{paciente_id}")
def eliminar_paciente(request, paciente_id: int):
    paciente = get_object_or_404(Paciente, id=paciente_id)
    paciente.delete()
    return {"success": True, "message": "Paciente eliminado"}

# --- 4. ENDPOINTS DE HISTORIAL MÉDICO ---

# Crear consulta
@router.post("/{paciente_id}/registros", response=RegistroOut)
def crear_registro(request, paciente_id: int, data: RegistroIn):
    paciente = get_object_or_404(Paciente, id=paciente_id)
    registro = RegistroMedico.objects.create(
        paciente=paciente,
        motivo=data.motivo,
        descripcion=data.descripcion
    )
    return registro

# Ver historial
@router.get("/{paciente_id}/historial", response=List[RegistroOut])
def ver_historial(request, paciente_id: int):
    return RegistroMedico.objects.filter(paciente_id=paciente_id)

# Actualizar una consulta específica
# NOTA: Aquí corregí "RegistroMedicoIn/Out" por "RegistroIn/Out" que son tus nombres reales
@router.put("/registros/{registro_id}", response=RegistroOut)
def actualizar_registro(request, registro_id: int, data: RegistroIn):
    registro = get_object_or_404(RegistroMedico, id=registro_id)
    for attr, value in data.dict().items():
        setattr(registro, attr, value)
    registro.save()
    return registro