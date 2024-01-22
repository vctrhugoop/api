import 'dotenv/config';
import 'express-async-errors';
import migrationsRun from './database/sqlite/migrations/index.js';
import express from 'express';
import cors from 'cors';

import AppError from './utils/AppError.js';
import uploadConfig from './configs/upload.js';
import routes from './routes/index.js';

const app = express();

migrationsRun();
app.use(cors());
app.use(express.json());

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  console.log(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error occurred',
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Serving is running on Port ${PORT}`));
