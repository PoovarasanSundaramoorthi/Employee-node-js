import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const salarySchema = new Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    perDaySalary: {
      type: Number,
      required: true,
    },
    workingDays: {
      type: Number,
      required: true,
    },
    monthSalary: {
      type: Number,
    },
    totalSalary: {
      type: Number,
    },
  },
  { timestamps: true }
);

salarySchema.set('timestamps', true);
salarySchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

// Calculate the total salary using a virtual property
// salarySchema.virtual('totalSalary').get(function () {
//   return this.perDaySalary * this.workingDays;
// });

salarySchema.set('autoIndex', true);

const EmployeeSalary = model('EmployeeSalary', salarySchema);
export default EmployeeSalary;
