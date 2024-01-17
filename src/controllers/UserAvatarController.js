import knex from '../database/knex/index.js';
import AppError from '../utils/AppError.js';
import DiskStorege from '../providers/DiskStorege.js';

export default class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;

    const diskStorege = new DiskStorege();

    const user = await knex('users').where({ id: user_id }).first();

    if (!user) {
      throw new AppError(
        'Somente usuário autenticados podem mudar o avatar',
        401
      );
    }

    if (user.avatar) {
      await diskStorege.deleteFile(user.avatar);
    }

    const filename = await diskStorege.saveFile(avatarFilename);
    user.avatar = filename;

    await knex('users').update(user).where({ id: user_id });

    return response.json(user);
  }
}
