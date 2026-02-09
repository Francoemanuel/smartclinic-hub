# SmartClinic Hub 🏥

Sistema integral de gestión clínica diseñado para la administración eficiente de pacientes y turnos. El proyecto implementa una arquitectura moderna, desacoplada y orquestada mediante contenedores para garantizar escalabilidad y facilidad de despliegue.

## 🚀 Tecnologías utilizadas

- **Frontend:** React (Next.js) + Tailwind CSS
- **Backend:** Django & **Django Ninja** (API de alto rendimiento basada en tipos de Python)
- **Infraestructura:** Docker & Docker Compose
- **Servidor Web / Proxy Inverso:** Nginx
- **Base de Datos:** PostgreSQL

## 🛠️ Arquitectura y Buenas Prácticas
- **Despliegue con Docker:** Contenedores independientes para cada servicio, asegurando un entorno de desarrollo idéntico al de producción.
- **Proxy Inverso:** Uso de Nginx para centralizar el tráfico y mejorar la seguridad de los microservicios.
- **API Moderna:** Implementación de endpoints rápidos y validados mediante Django Ninja.
- **Seguridad:** Gestión de credenciales mediante variables de entorno (archivos `.env`).

## 🔧 Instalación y Despliegue
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Francoemanuel/smartclinic-hub.git