import { getAll, getOne, deleteOne, updateOne, createOne } from './baseController.js';
import Employee from '../models/employeeModel.js';
import sgMail from '@sendgrid/mail';

// Login
export async function Login(req, res, next) {
  try {
    const data = req.body;

    const userLogin = await Employee.findOne({ email: data.email, password: data.password });
    if (userLogin.role === 'admin') {
      // USER To put JWT token and other authorized functions

      res.status(200).json({
        status: 'Success',
        message: 'Login Successfully',
        userLogin,
      });
    } else {
      // User is not authenticated
      res.status(401).json({ success: false, error: 'Unauthorized' });
    }
  } catch (err) {
    next(err);
  }
}

// Logout
export async function Logout(req, res, next) {
  try {

    // Session maintain token clear 

    //  req.session.destroy();
    
     res.json({ success: true, message: 'Logout successful' });


  } catch (err) {
    next(err);
    console.log('err', err);
  }
}

// export const createEmployee = createOne(Employee);
export const getAllEmployee = getAll(Employee);
export const getOneEmployee = getOne(Employee);
export const updateEmployee = updateOne(Employee);
export const deleteEmployee = deleteOne(Employee);

export async function createEmployee(req, res, next) {
  try {
    const data = req.body;
    console.log('data', data);
    const password = Math.random().toString(30).substring(2, 10) + Math.random().toString(30).substring(2, 10);
    const createEmployee = await Employee.create({
      name: data.name,
      age: data.age,
      designation: data.designation,
      department: data.department,
      address: data.address,
      email: data.email,
      phone: data.phone,
      salary: data.salary,
      password: password,
    });
    if (createEmployee) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: 'test@example.com', // Change to your recipient
        from: 'test@example.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: ` <h2>New Employee Details</h2>
        <p><strong>Name:</strong> ${data?.name}</p>
        <p><strong>Age:</strong> ${data?.age}</p>
        <p><strong>Designation:</strong> ${data?.designation}</p>
        <p><strong>Department:</strong> ${data?.department}</p>
        <p><strong>Address:</strong> ${data?.address}</p>
        <p><strong>Email:</strong> ${data?.email}</p>
        <p><strong>Phone:</strong> ${data?.phone}</p>
        <p><strong>Salary:</strong> ${data?.salary}</p>
        <p><strong>Password:</strong> ${password}</p> `,
      };

      sgMail
        .send(msg)
        .then((response) => {
          console.log(response[0].statusCode);
          console.log(response[0].headers);
          if (response[0].statusCode) {
            res.status(201).json({
              success: true,
              message: 'Employee created successfully',
              employee: createEmployee,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          next(error);
        });
    }
  } catch (error) {
    console.log('error', error);
    next(error);
  }
}
