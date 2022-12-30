import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const generateToken = (user: Partial<User>): string =>
  jwt.sign(user, process.env.JWT_SECRET || 'superSecret', { expiresIn: '60d' });
