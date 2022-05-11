import Videojuego from "../../domain-layer/entities/Videojuego";
import DatabaseConnection from "../../persistence-layer/DatabaseConnection";
import FindGVTask from './FindVGTask';
import Inventario from "../../domain-layer/entities/Inventario";
import IAsyncTask from "./IAsyncTask";

export type UpdateGameData = {
id: number;
name: string;
year: string;

}

export default class UpdateVGTask implements IAsyncTask<Videojuego> {
private updateGameData: UpdateGameData;

public constructor(gameData: UpdateGameData) {
  this.updateGameData = gameData;
}

public async execute(): Promise<Videojuego> {
  
  const findVGTask = new FindGVTask(this.updateGameData.id);

  const game = await findVGTask.execute();

  game.name = this.updateGameData.name;
  game.year = this.updateGameData.year;

  const databaseConnection = await DatabaseConnection.getInstance();
  const gameRepository = databaseConnection.getRepository(Videojuego);

  gameRepository.save(game);

  return game;
}

}