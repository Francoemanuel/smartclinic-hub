from ninja import Schema
from datetime import date, datetime
from typing import List, Optional

class PacienteIn(Schema):
    nombre: str
    dni: str
    fecha_nacimiento: date
    telefono: Optional[str] = None

class PacienteOut(Schema):
    id: int
    nombre: str
    dni: str
    fecha_nacimiento: date
    telefono: Optional[str] = None

class RegistroIn(Schema):
    motivo: str
    descripcion: str

class RegistroOut(Schema):
    id: int
    fecha: datetime
    motivo: str
    descripcion: str