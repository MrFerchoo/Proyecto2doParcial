import { Request, Response } from "express";
import AddVGTask, { AddVGData } from "../Task/AddVGTask";
import BaseController from "./BaseController";

export default class InventarioController extends BaseController{
    public constructor() {
        super('/inventory-ins');
    }

    protected configureRouter(): void {
        this.router.post('/', this.addInventoryIns.bind(this));
    }

    private async addInventoryIns(req: Request, res: Response): Promise<void>{
        try{
            const addCarData = <AddVGData>req.body;

            const addInventoryInsTask = new AddVGTask(addCarData);
            const inventoryIns = await addInventoryInsTask.execute();

            this.respond(res, 200, inventoryIns);
        }catch(e){
            if((<Error>e).message === 'Video juego no encontrado.'){
                this.respond(res, 404);
            }else{
                this.respond(res, 500);
            }
            
        }
    }
}