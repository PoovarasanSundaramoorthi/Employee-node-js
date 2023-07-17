import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      // enum: ['admin', 'employee'],
      default: 'employee',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

employeeSchema.set('timestamps', true);
employeeSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

employeeSchema.set('autoIndex', true);

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
