"use client"

import { useEffect, useState } from 'react'

// 1. Definimos la interfaz para evitar errores de TypeScript (any type)
interface Paciente {
  id: number;
  nombre: string;
  dni: string;
  fecha_nacimiento?: string;
  telefono?: string;
}

export default function Home() {
  // Estados para manejar los datos y la interfaz
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState<boolean>(true)

  useEffect(() => {
    // btoa convierte 'usuario:password' a Base64
    const auth = btoa('root:1234'); 
    
    // URL IMPORTANTE: Asegúrate de que termine en / para Django
    const url = 'http://localhost:8000/api/pacientes/';

    console.log("Iniciando conexión con el Backend...");

    fetch(url, { 
      method: 'GET',
      headers: { 
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
      }
    })
    .then(async res => {
      if (!res.ok) {
        // Si no es un JSON, leemos el texto del error (como el Method Not Allowed)
        const text = await res.text();
        throw new Error(`Servidor respondió ${res.status}: ${text}`);
      }
      return res.json();
    })
    .then(data => {
      console.log("Datos recibidos con éxito:", data);
      setPacientes(data);
      setCargando(false);
    })
    .catch(err => {
      console.error("Error capturado en el frontend:", err.message);
      setError(err.message);
      setCargando(false);
    });
  }, []);

  // Vista de Error
  if (error) {
    return (
      <div className="p-10 m-10 bg-red-50 border border-red-200 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold text-red-700 mb-2">Error de Conexión</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <div className="bg-white p-4 rounded-lg border border-red-100 text-sm text-gray-700">
          <p className="font-semibold mb-2">Sugerencias para arreglarlo:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Verifica que el usuario sea <strong>root</strong> y contraseña <strong>1234</strong>.</li>
            <li>Revisa que el Backend esté encendido (<code>docker-compose ps</code>).</li>
            <li>Asegúrate de que <strong>CORS_ALLOW_ALL_ORIGINS = True</strong> esté en el <code>settings.py</code> de Django.</li>
          </ul>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
        >
          Reintentar ahora
        </button>
      </div>
    );
  }

  // Vista Principal
  return (
    <main className="p-8 bg-gray-50 min-h-screen text-slate-900">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-10 border-b pb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">
              SmartClinic <span className="text-blue-500 text-2xl font-light">Hub</span>
            </h1>
            <p className="text-slate-500 mt-1">Gestión Centralizada de Pacientes</p>
          </div>
          {cargando && (
            <div className="flex items-center gap-2 text-blue-600 animate-pulse">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-medium">Sincronizando...</span>
            </div>
          )}
        </header>

        <section>
          {pacientes.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {pacientes.map((p) => (
                <div 
                  key={p.id} 
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                        {p.nombre}
                      </h3>
                      <p className="text-slate-500 flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold bg-slate-100 px-2 py-0.5 rounded">DNI</span> 
                        {p.dni}
                      </p>
                    </div>
                    <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">
                      {p.nombre.charAt(0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !cargando && (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 text-lg italic">
                  No hay pacientes registrados en el sistema.
                </p>
              </div>
            )
          )}
        </section>
      </div>
    </main>
  );
}