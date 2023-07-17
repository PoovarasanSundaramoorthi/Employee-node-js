import Employee from '../models/employeeModel.js';
import EmployeeSalary from '../models/employeeSalaryModel.js';
import { deleteOne, getAll, getOne, updateOne } from './baseController.js';

export const getAllEmployeeSalary = getAll(EmployeeSalary);
export const getOneEmployeeSalary = getOne(EmployeeSalary);
export const updateEmployeeSalary = updateOne(EmployeeSalary);
export const deleteEmployeeSalary = deleteOne(EmployeeSalary);

export async function createEmployeeSalary(req, res, next) {
  try {
    // const { employeeIds, perDaySalary, workingDays } = req.body;

    // Check if the employee exists
    // const employee = await Employee.findById(employeeId);

    // if (!employee) {
    //   return res.status(404).json({ error: 'Employee not found' });
    // }

    // Check if the employee IDs are provided
    // if (!employeeIds || !Array.isArray(employeeIds) || employeeIds.length === 0) {
    //   return res.status(400).json({ success: false, error: 'Invalid employee IDs' });
    // }

    // const totalSalary = perDaySalary * workingDays;
    // const data = {
    //   totalSalary: totalSalary,
    //   employeeId: employeeId,
    //   perDaySalary: perDaySalary,
    //   workingDays: workingDays,
    // };
    // const createSalary = await EmployeeSalary.create(data);

    // res.status(201).json({
    //   success: true,
    //   message: 'Salary details added successfully',
    //   salary: createSalary,
    // });

    const salaryDetails = req.body;
    for (let salary of salaryDetails) {
      const { employeeId, perDaySalary, workingDays, month, year } = salary;

      // Check if the employee exists
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      // Check if the employee salary details already exist for the given month and year
      const existingSalary = await EmployeeSalary.findOne({ employeeId: employeeId, month: month, year: year });
      if (existingSalary) {
        return res
          .status(400)
          .json({ error: 'Salary details already exist for the employee in the specified month and year' });
      }

      const previousSalary = await EmployeeSalary.find({ employeeId: employeeId });
      const previousTotal = previousSalary.reduce((sum, obj) => sum + obj.monthSalary, 0);
      const currentSalary = perDaySalary * workingDays;
      const totalSalary = previousTotal + currentSalary;
      const newSalary = {
        employeeId: employeeId,
        month: month,
        year: year,
        perDaySalary: perDaySalary,
        monthSalary: currentSalary,
        workingDays: workingDays,
        totalSalary: totalSalary,
      };
      const savedSalary = await EmployeeSalary.create(newSalary);
    }
    res.status(201).json({
      success: true,
      message: 'Salary details saved successfully',
    });
  } catch (error) {
    console.log('error', error);
    next(error);
  }
}

export async function EmpYearSalaryDetails(req, res, next) {
  const data = req.query;
  const details = await EmployeeSalary.find({ employeeId: data.employeeId, year: data.year });

  res.status(200).json({
    success: true,
    message: 'Year Salary details saved successfully',
    year: details,
  });
}
export async function EmpDateBasedSalaryFilter(req, res, next) {
  const data = req.query;
  const details = await EmployeeSalary.find({ employeeId: data.employeeId });

  const filteredData = details.filter((item) => {
    const { year, month } = item;
    return (year === data?.fromYear && month >= data.fromMonth) || (year === data?.toYear && month <= data.toMonth);
  });

  res.status(200).json({
    success: true,
    message: 'Year Salary details saved successfully',
    data: filteredData,
  });
}


