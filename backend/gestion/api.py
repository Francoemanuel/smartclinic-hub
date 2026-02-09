from ninja import Router
from typing import List
from django.shortcuts import get_object_or_404
from .models import Medico, Especialidad, Turno
from .schemas import MedicoOut, TurnoIn, TurnoOut

router = Router()

# --- ENDPOINTS DE MÉDICOS ---

@router.get("/medicos", response=List[MedicoOut])
def listar_medicos(request):
    return Medico.objects.all()

# --- ENDPOINTS DE TURNOS ---

@router.post("/turnos", response=TurnoOut)
def agendar_turno(request, data: TurnoIn):
    # Creamos el turno usando los IDs que vienen en el Schema
    turno = Turno.objects.create(
        paciente_id=data.paciente_id,
        medico_id=data.medico_id,
        fecha_hora=data.fecha_hora,
        motivo=data.motivo
    )
    return turno

@router.get("/turnos", response=List[TurnoOut])
def listar_turnos(request):
    # Usamos select_related para que la consulta sea rápida (trae paciente y médico de un solo golpe)
    return Turno.objects.select_related('paciente', 'medico').all().order_by('fecha_hora')

@router.patch("/turnos/{turno_id}/completar")
def completar_turno(request, turno_id: int):
    turno = get_object_or_404(Turno, id=turno_id)
    turno.completated = True
    turno.save()
    return {"message": "Turno marcado como completado"}