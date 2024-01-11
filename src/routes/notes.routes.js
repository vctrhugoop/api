import Router from 'express';
import NotesController from '../controllers/NotesController.js';

const notesRoutes = Router();
const notesController = new NotesController();

notesRoutes.get('/', notesController.index);
notesRoutes.post('/:user_id', notesController.create);
notesRoutes.get('/:id', notesController.show);
notesRoutes.delete('/:id', notesController.delete);

export default notesRoutes;
