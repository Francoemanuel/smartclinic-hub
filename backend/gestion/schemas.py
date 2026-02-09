from ninja import Schema
from datetime import datetime
from pacientes.schemas import PacienteOut # Reutilizamos el de pacientes!

class MedicoOut(Schema):
    id: int
    nombre: str
    especialidad_id: int
    matricula: str

class TurnoIn(Schema):
    paciente_id: int
    medico_id: int
    fecha_hora: datetime
    motivo: str

class TurnoOut(Schema):
    id: int
    paciente: PacienteOut
    medico: MedicoOut
    fecha_hora: datetime
    motivo: str