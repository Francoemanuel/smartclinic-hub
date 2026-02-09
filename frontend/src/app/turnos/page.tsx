"use client"
import { useEffect, useState } from 'react'
import { Calendar as CalendarIcon, User, Stethoscope, CheckCircle2, Circle, Loader2, ClipboardList } from "lucide-react";

export default function TurnosPage() {
  const [turnos, setTurnos] = useState([])
  const [loadingId, setLoadingId] = useState<number | null>(null); // Para mostrar carga en el botón

  const cargarTurnos = () => {
    const auth = btoa('root:1234');
    // fetch('http://localhost:8000/api/gestion/turnos', {
    fetch('/api/gestion/turnos', {
      headers: { 'Authorization': `Basic ${auth}` }
    })
    .then(res => res.json())
    .then(data => setTurnos(data))
    .catch(err => console.error("Error al cargar turnos:", err));
  };

  useEffect(() => {
    cargarTurnos();
  }, []);

  const marcarCompletado = async (id: number) => {
    setLoadingId(id);
    const auth = btoa('root:1234');
    
    try {
      const res = await fetch(`http://localhost:8000/api/gestion/turnos/${id}/completar`, {
        method: 'PATCH',
        headers: { 'Authorization': `Basic ${auth}` }
      });

      if (res.ok) {
        // Si sale bien, refrescamos la lista
        cargarTurnos();
      }
    } catch (error) {
      console.error("Error al completar turno:", error);
    } finally {
      setLoadingId(null);
    }
  };

  const formatearFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    return {
      dia: fecha.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      hora: fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="max-w-6xl mx-auto text-black">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Agenda de Turnos</h1>
        <p className="text-slate-500">Haz clic en el estado para marcar como atendido.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-semibold text-slate-600">Fecha y Hora</th>
              <th className="p-4 font-semibold text-slate-600">Paciente</th>
              <th className="p-4 font-semibold text-slate-600">Médico</th>
              <th className="p-4 font-semibold text-slate-600 text-center">Motivo</th>
              <th className="p-4 font-semibold text-slate-600 text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((t: any) => {
              const { dia, hora } = formatearFecha(t.fecha_hora);
              return (
                <tr key={t.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="bg-blue-50 text-blue-700 p-2 rounded-lg text-center w-20">
                      <span className="block text-xs uppercase font-bold">{dia}</span>
                      <span className="text-sm font-bold">{hora}</span>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-slate-700">{t.paciente.nombre}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Stethoscope size={14} className="text-blue-500" />
                      <span className="text-sm text-slate-800">{t.medico.nombre}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-start gap-2">
                        <ClipboardList size={14} className="text-slate-400 mt-1" />
                        <p className="text-sm text-slate-600 max-w-[200px] leading-tight">
                        {t.motivo}
                        </p>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    {t.completado ? (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                        <CheckCircle2 size={14} /> Atendido
                      </span>
                    ) : (
                      <button 
                        onClick={() => marcarCompletado(t.id)}
                        disabled={loadingId === t.id}
                        className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold hover:bg-amber-600 hover:text-white transition-all disabled:opacity-50"
                      >
                        {loadingId === t.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Circle size={14} />
                        )}
                        Marcar Atendido
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}