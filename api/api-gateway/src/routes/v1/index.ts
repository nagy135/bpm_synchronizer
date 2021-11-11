import { Router } from 'express';

const RouterV1 = Router();

RouterV1.all('', (_req, res) => {
    res.send('<p>haha</p>');
})

export default RouterV1;
