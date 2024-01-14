import knex from '../database/knex/index.js';
import AppError from '../utils/AppError.js';
import { compare } from 'bcrypt';

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

    return response.json({ user });
  }
}
