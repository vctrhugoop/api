import Router from 'express';
import multer from 'multer';
import uploadConfig from '../configs/upload.js';

import UsersController from '../controllers/UsersController.js';
import ensureAuthenticated from '../middlewares/ensureAuthenticated.js';

const usersRoutes = Router();
const usersController = new UsersController();
const upload = multer(uploadConfig.MULTER);

usersRoutes.post('/', usersController.create);
usersRoutes.put('/', ensureAuthenticated, usersController.update);
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  (request, response) => {
    console.log(request.file.filename);
    response.json();
  }
);

export default usersRoutes;
