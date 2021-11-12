import { Router } from 'express';

const RouterV1: Router = Router();

RouterV1.all('/songs', (_req, res) => {
  res.send('<p>hgahahah</p>');
});

export default RouterV1;
