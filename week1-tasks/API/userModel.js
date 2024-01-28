import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  text: { type: String },
  completed: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [taskSchema], // Adding the array field
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
