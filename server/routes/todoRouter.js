import { Router } from 'express'
import { getTasks, postTask, deleteTask } from '../controllers/TaskController.js'

const router = Router()

router.get('/', getTasks) //hakee kaikki taskit
router.post('/create', postTask) // luo taskin
router.delete('/delete/:id', deleteTask) //poistaa taskin id:n perusteella
export default router
