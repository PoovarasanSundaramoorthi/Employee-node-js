import { Router } from 'express';
import {
  EmpDateBasedSalaryFilter,
  EmpYearSalaryDetails,
  createEmployeeSalary,
  deleteEmployeeSalary,
  getAllEmployeeSalary,
  getOneEmployeeSalary,
  updateEmployeeSalary,
} from '../controllers/employeeSalaryController.js';
const router = Router();

router.route('/').post(createEmployeeSalary).get(getAllEmployeeSalary);
router.route('/:id').get(getOneEmployeeSalary).patch(updateEmployeeSalary).delete(deleteEmployeeSalary);
router.route('/year/filter').get(EmpYearSalaryDetails);
router.route('/date/filter').get(EmpDateBasedSalaryFilter);

export default router;
