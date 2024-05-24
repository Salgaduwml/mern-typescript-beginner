import { RequestHandler } from "express";
import userModel from "../models/user.model";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, "User not authenticated");
    }
    const user = await userModel
      .findById(authenticatedUserId)
      .select("+email")
      .exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const { username, password: passwordRow, email } = req.body;

  try {
    if (!username || !email || !passwordRow) {
      throw createHttpError(400, "Parameters missing");
    }

    const existingUsername = await userModel
      .findOne({ username: username })
      .exec();
    if (existingUsername) {
      throw createHttpError(409, "Username already taken");
    }

    const existingEmail = await userModel.findOne({ email: email }).exec();
    if (existingEmail) {
      throw createHttpError(409, "User already exist. Please login.");
    }

    const hashedPassword = await bcrypt.hash(passwordRow, 10);

    const newUser = await userModel.create({
      username: username,
      password: hashedPassword,
      email: email,
    });

    req.session.userId = newUser._id;
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw createHttpError(400, "Parameters missing");
    }

    const user = await userModel
      .findOne({ username: username })
      .select("+password +email")
      .exec();

    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
