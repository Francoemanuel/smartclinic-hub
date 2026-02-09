import type { Metadata } from "next";
import Link from 'next/link';
import { Geist, Geist_Mono } from "next/font/google";
import { Users, Calendar, Activity, ClipboardList } from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartClinic Hub",
  description: "Sistema de gestión médica inteligente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex bg-gray-50 min-h-screen text-black`}>
        
        {/* BARRA LATERAL (SIDEBAR) */}
        <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full shadow-xl">
          <div className="p-6 border-b border-slate-800">
            <h1 className="text-xl font-bold flex items-center gap-2 text-blue-400">
              <Activity className="text-blue-500" /> SmartClinic
            </h1>
          </div>
          
          <nav className="flex-1 p-4 space-y-2 mt-4">
            <Link 
              href="/" 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-all group"
            >
              <Users size={20} className="group-hover:text-blue-400" /> 
              <span>Pacientes</span>
            </Link>

            <Link 
              href="/turnos" 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-all group"
            >
              <Calendar size={20} className="group-hover:text-blue-400" /> 
              <span>Agenda de Turnos</span>
            </Link>

            <Link 
              href="#" 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-all group"
            >
              <ClipboardList size={20} className="group-hover:text-blue-400" /> 
              <span>Historiales</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
            SmartClinic v1.0
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="ml-64 flex-1 p-8">
          {children}
        </main>

      </body>
    </html>
  );
}