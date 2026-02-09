from ninja import NinjaAPI
from pacientes.api import router as pacientes_router
from gestion.api import router as gestion_router 
from pacientes.auth import BasicAuth

api = NinjaAPI(
    title="SmartClinic Hub",
    version="2.0.0",
    auth=BasicAuth()
)

# Montamos los routers
api.add_router("/pacientes", pacientes_router)
api.add_router("/gestion", gestion_router)