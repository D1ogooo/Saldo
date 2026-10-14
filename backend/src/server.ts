import express from 'express';
import cors from 'cors'
import { router } from './routes';
import { initDB } from './config/databaseConfig'

const app = express();

initDB();
app.use(cors());
app.use(express.json());
app.use(router)

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000 🐱‍👤")
})