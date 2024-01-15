import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import knex from '../database/knex/index.js';
import AppError from '../utils/AppError.js';
import authConfig from '../configs/auth.js';

export class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex('users').where({ email }).first();

    if (!user) {
      throw new AppError('E-mail e/ou senha incorreta', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('E-mail e/ou senha incorreta', 401);
    }

    const { sign } = jwt;
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return response.json({ user, token });
  }
}
