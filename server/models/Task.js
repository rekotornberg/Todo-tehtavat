import { pool } from '../helpers/db.js'

// hakee kaikki taskit
const selectAllTasks = async () => {
  return await pool.query('SELECT * FROM task')
}

// lisää taskin tietokantaan
const insertTask = async (description) => {
  return await pool.query('INSERT INTO task (description) VALUES ($1) RETURNING *',[description])
}

// poistaa taskin
const deleteTaskById = async (id) => {
  return await pool.query('DELETE FROM task WHERE id = $1', [id])
}

export { selectAllTasks, insertTask, deleteTaskById }
