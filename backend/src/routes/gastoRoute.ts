import express from 'express';
import { GastoController } from '../controllers/gastoController';
const gasto = new GastoController();
const gastoRouter = express.Router();

gastoRouter.post('/create', gasto.create);
gastoRouter.get('/read', gasto.read);
gastoRouter.put('/update', gasto.update);
gastoRouter.delete('/delete/:id', gasto.delete);

export { gastoRouter };  