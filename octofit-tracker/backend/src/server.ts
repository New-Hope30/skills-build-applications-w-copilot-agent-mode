import express from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/index.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit API listening on port ${port}`);
      console.log(`OctoFit API base URL: ${baseUrl}`);
    });
  })
  .catch((error) => {
    console.error('Unable to start OctoFit API:', error);
    process.exit(1);
  });