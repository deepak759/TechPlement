import User from "./userModel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "./utils/error.js";
import jwt from "jsonwebtoken";



//function for signup user
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  const user = new User({ username, email, password: hashedPassword });
  try {
    await user.save();
    res.status(200).json("user Created succesfully");
  } catch (error) {
    next(error);
  }
};


//function for signIn user
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) return next(errorHandler(404, "User Not Found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
   
    const { password: pass, ...rest } = validUser._doc;
    res.cookie("acces_token", token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


//function for logout user
export const logOutUser = async (req, res, next) => {
  try {
    res.clearCookie("acces_token").status(200).json("User logout Succesfully");
  } catch (error) {
    next(error);
  }
};


//function for creating todo
export const createTodo = async (req, res, next) => {
  try {
    const { text, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "user Not Found"));
    }
    if (!text) next(errorHandler(404, "Todo Not Found"));
    user.tasks.push({ text });
    await user.save();

    const{password:pass,...rest}=user._doc
    res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};


//function for delete todo
export const deleteTodo = async (req, res, next) => {
  try {
    const { todoId, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "user Not Found"));
    }
    const tasks = user.tasks.filter((task) => task.id !== todoId);
   
    user.tasks = tasks;
    await user.save();
    const{password:pass,...rest}=user._doc
    res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};

//function for updating completed property of todo
export const updateTodo = async (req, res, next) => {
  try {
    const { todoId, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User Not Found"));
    }

    const updatedTasks = user.tasks.map((task) => {
      if (task.id == todoId) {
        task.completed = !task.completed;
      
      }
      return task;
    });

    user.tasks = updatedTasks;
    await user.save();
    const{password:pass,...rest}=user._doc
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
