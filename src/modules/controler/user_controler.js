import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();
import { userModel } from "../models/user_model.js";
import { ErrorHandler, SendError } from "../../services/errorhandeler.js";
import {
  resetPasswordEmail,
  sendEmail,
} from "../../utils/nodemailer/nodemailer.js";

export const signup = ErrorHandler(async (req, res) => {
  const { password } = req.body;
  const hashedPassword = bcrypt.hashSync(
    password,
    parseInt(process.env.HASHINGALT) || 10,
  );
  const create = await userModel.create({
    ...req.body,
    password: hashedPassword,
  });

  if (!create) throw new SendError(400, "bad Request");
  sendEmail(req.body.email);

  res.status(201).json({
    status: "success",
    message: "Created successfully , verify your email now",
    data: create,
  });
});

export const updateAcount = ErrorHandler(async (req, res) => {
  const { email: oldEmail } = req.user;
  const { email, phone, address, name } = req.body;
  const updateUser = await userModel.findOneAndUpdate(
    { email: oldEmail },
    { email, phone, address, name },
    { returnDocument: "after" },
  );
  if (!updateUser) throw new SendError(400, "Error is updating acount data");
  if (email) {
    updateUser.verifed = false;
    await updateUser.save();
    sendEmail(email);
  }
  res.status(200).json({
    message: "success",
    data: updateUser,
  });
});
export const updatePassword = ErrorHandler(async (req, res) => {
  const { email } = req.user;
  const { password } = req.body;
  const hashPassword = bcrypt.hashSync(
    password,
    parseInt(process.env.HASHINGALT) || 10,
  );
  const updatePass = await userModel.findOneAndUpdate(
    { email },
    { password: hashPassword },
  );
  if (!updatePass) throw new SendError(400, "Error is updating  password");
  res.status(200).json({
    message: "success",
    data: updatePass,
  });
});
export const getMyAcountData = ErrorHandler(async (req, res) => {
  const { email } = req.user;
  const getData = await userModel.findOne({ email }, { password: 0 });
  if (!getData) throw new SendError(400, "Error is geting  your data");
  res.status(200).json({
    message: "success",
    data: getData,
  });
});

export const login = ErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return next(new SendError(401, "Invalid email or password"));
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return next(new SendError(401, "Invalid email or password"));
  }

  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      verifed: user.verifed,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1m" },
  );
  const userResponse = user.toObject();
  delete userResponse.password;

  res.status(200).json({
    message: "Login successful",
    token: token,
    data : userResponse
  });
});

export const verifyEmial = ErrorHandler(async (req, res) => {
  const { token } = req.params;
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const { email } = decodedToken;
  const findUser = await userModel.findOne({ email });
  if (!findUser) throw new SendError(400, "user not found");
  findUser.verifed = true;
  await findUser.save();
  res.status(200).json({ message: "verfied successfuly", data: findUser });
});

//reset password
// 1 - verify
// 2 - otp
// 3 - new password

export const addForResetPassword = ErrorHandler(async (req, res) => {
  const { email } = req.body;
  const findUser = await userModel.findOne({ email });
  if (!findUser) throw new SendError(400, "Error asking for reset password");
  resetPasswordEmail(findUser.email);
  res.json({
    message: "success , cheak your mail ",
  });
});

export const newpassword = ErrorHandler(async (req, res) => {
  const { password, otp } = req.body;
  const { otpToken } = req.params;
  const decoded = jwt.verify(otpToken, process.env.SECRET_KEY);
if (otp !== decoded.otp) throw new SendError(400, " otp is not vallied ");  const hashedPassword = bcrypt.hashSync(
    password,
    parseInt(process.env.HASHINGALT) || 10,
  );
  const updatePass = await userModel.findOneAndUpdate(
    { email: decoded.email },
    { password: hashedPassword },
  );
  if (!updatePass) throw new SendError(404, "the user is not found");
  res.json({
    message: "password reset successfly",
  });
});
