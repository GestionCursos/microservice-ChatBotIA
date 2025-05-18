import { pool } from "../config/db"

export const consultaEventosDisponibles = async () => {
    const responseQuery = await pool.query('select e.*,o.nombre,o.institucion,o.correo from "Eventos" e inner join "Organizador" o on e.id_organizador = o.id_organizador where e.visible = true; ')
    console.log(responseQuery.rows)
} 