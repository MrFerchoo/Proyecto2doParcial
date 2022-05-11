import Inventario from "../../domain-layer/entities/Inventario";
import DatabaseConnection from "../../persistence-layer/DatabaseConnection";
import FindVGTask from "../Task/FindVGTask"
import IAsyncTask from "./IAsyncTask";

export type AddInventoryInsData = {
gameId: number;
quantity: number;

};

export default class AddInventoryIns implements IAsyncTask<Inventario> {
  private addInventoryInsData: AddInventoryInsData;

  public constructor(addInventoryInsData: AddInventoryInsData) {
    this.addInventoryInsData = addInventoryInsData;
  }
  
  public async execute(): Promise<Inventario> {
    const { gameId, quantity } = this.addInventoryInsData;

    const findVGTask = new FindVGTask(gameId);
    const game = await findVGTask.execute();

    const databaseConnection = await DatabaseConnection.getInstance();
    const inventoryInsRepository = databaseConnection.getRepository(Inventario);

    const inventoryIns = await inventoryInsRepository.save({
      game,
      quantity,
      date: new Date()
    });

    return inventoryIns;
  }
}
