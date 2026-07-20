// src/lib/apiRoutes.ts

// URL base del backend
export const API_BASE_URL = "http://localhost:8080";

// Rutas agrupadas por módulo
export const apiRoutes = {
  asuarios:{
    list: `${API_BASE_URL}/usuarios`,
    getById: (id: number | string) => `${API_BASE_URL}/usuarios/${id}`,
  },
  alumnos: {
    list: `${API_BASE_URL}/alumnos`,
    create: `${API_BASE_URL}/alumnos`,
    getById: (id: number | string) => `${API_BASE_URL}/alumnos/${id}`,
    update: (id: number | string) => `${API_BASE_URL}/alumnos/${id}`,
    delete: (id: number | string) => `${API_BASE_URL}/alumnos/${id}`,
    horarios: (id: number | string) => `${API_BASE_URL}/horarios/${id}`,
  },
  docentes: {
    list: `${API_BASE_URL}/docentes`,
    create: `${API_BASE_URL}/docentes`,
    getById: (id: number | string) => `${API_BASE_URL}/docentes/${id}`,
    update: (id: number | string) => `${API_BASE_URL}/docentes/${id}`,
    delete: (id: number | string) => `${API_BASE_URL}/docentes/${id}`,
    horarios: (id: number | string) => `${API_BASE_URL}/docentes/horarios/${id}`,
  },
  materias: {
    list: `${API_BASE_URL}/materias`,
    create: `${API_BASE_URL}/materias`,
    getById: (id: number | string) => `${API_BASE_URL}/materias/${id}`,
    update: (id: number | string) => `${API_BASE_URL}/materias/${id}`,
    delete: (id: number | string) => `${API_BASE_URL}/materias/${id}`,
  },
  secciones: {
    list: `${API_BASE_URL}/secciones`,
    create: `${API_BASE_URL}/secciones`,
    getById: (id: number | string) => `${API_BASE_URL}/secciones/${id}`,
    update: (id: number | string) => `${API_BASE_URL}/secciones/${id}`,
    delete: (id: number | string) => `${API_BASE_URL}/secciones/${id}`,
    addAlumnos: `${API_BASE_URL}/secciones/add-alumnos`,
    addHorarios: `${API_BASE_URL}/secciones/add-horarios`,
  },
  areas: {
    list: `${API_BASE_URL}/materias/areas/lista`,
  },
  grados: {
    list: `${API_BASE_URL}/grados`,
    create: `${API_BASE_URL}/grados`,
    getById: (id: number | string) => `${API_BASE_URL}/grados/${id}`,
    update: (id: number | string) => `${API_BASE_URL}/grados/${id}`,
  },
};
