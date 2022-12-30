import { User } from "../models/user.model";
import "dotenv/config";

const jwt = require("jsonwebtoken");

export const generateToken = (user: Partial<User>): string =>
  jwt.sign(user, process.env.JWT_SECRET || 'superSecret', { expiresIn: '360d' });