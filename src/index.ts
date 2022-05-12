import express from 'express';
import { json } from 'body-parser';
import 'reflect-metadata';
import VideogameController from './service-layer/Controllers/VideogameController';
import InventarioController from './service-layer/Controllers/InvenatarioController';

const app = express();
const port = 3001;

app.use(json());

const videogameController = new VideogameController();
const invenatarioController = new InventarioController();

videogameController.mount(app);
invenatarioController.mount(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});