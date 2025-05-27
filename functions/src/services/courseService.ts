import {pool} from "../config/db";

// 1. Consulta eventos disponibles
export const consultaEventosDisponibles = async () => {
  const query = `
        SELECT 
            e.id_evento,
            e.nombre,
            e.tipo_evento,
            e.fecha_inicio,
            e.fecha_fin,
            e.costo,
            e.categoria,
            e.modalidad,
            e.descripcion,
            e.id_organizador,
            o.nombre AS organizador_nombre
        FROM "Eventos" e
        INNER JOIN "Organizador" o ON e.id_organizador = o.id_organizador
        WHERE e.visible = true;
    `;

  const response = await pool.query(query);
  console.log(response);
  return response.rows;
};

// 2. Detalles de evento específico
export const detallesEspecificos = async (id: number) => {
  const query = `
        SELECT 
            e.*,
            o.nombre,
            o.institucion,
            o.correo
        FROM "Eventos" e
        INNER JOIN "Organizador" o ON e.id_organizador = o.id_organizador
        WHERE e.id_evento = $1;
    `;

  const response = await pool.query(query, [id]);
  return response.rows;
};

// 3. Buscar cursos por palabra clave
export const cursoPorPalabraClave = async (palabra: string) => {
  const query = `
        SELECT 
            e.id_evento,
            e.nombre,
            e.descripcion
        FROM "Eventos" e
        WHERE e.visible = true
          AND (e.nombre ILIKE $1 OR e.descripcion ILIKE $1);
    `;

  const searchTerm = `%${palabra}%`;
  const response = await pool.query(query, [searchTerm]);
  return response.rows;
};

// 4. Información del instructor
export const informacionDelInstructor = async (id: number) => {
  const query = `
        SELECT 
            o.nombre,
            o.correo,
            COUNT(e.nombre) AS "cursos creados",
            o.institucion
        FROM "Organizador" o
        LEFT JOIN "Eventos" e ON e.id_organizador = o.id_organizador
        WHERE o.id_organizador = $1
        GROUP BY o.nombre, o.correo, o.institucion;
    `;

  const response = await pool.query(query, [id]);
  return response.rows;
};
