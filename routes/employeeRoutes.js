import { Router } from 'express';
import {
  Login,
  Logout,
  createEmployee,
  deleteEmployee,
  getAllEmployee,
  getOneEmployee,
  updateEmployee,
} from '../controllers/employeeController.js';
const router = Router();

router.route('/').post(createEmployee).get(getAllEmployee);
router.route('/:id').patch(updateEmployee).get(getOneEmployee).delete(deleteEmployee);
router.route('/login').post(Login);
router.route('/logout').post(Logout);

export default router;
