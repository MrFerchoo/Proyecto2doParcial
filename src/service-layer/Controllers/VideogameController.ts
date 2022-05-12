import { Request,Response } from "express";
import AddVGTask, { AddVGData } from "../Task/AddVGTask";
import DeleteVGTask from "../Task/DeleteVGTask";
import FindVGTask from "../Task/FindVGTask";
import GetVGListTask from "../Task/GetVGListTask";
import UpdateVGTask, { UpdateGameData } from '../Task/UpdateVGTask';
import BaseController from "./BaseController";


export default class InventoryInsController extends BaseController{
    public constructor(){
        super('/inventory-ins');
    }
    protected configureRouter(): void {
      this.router.get('/', this.getVGList.bind(this));
      this.router.get('/', this.findVG.bind(this));
      this.router.get('/', this.addVG.bind(this));
      this.router.get('/', this.getVGList.bind(this));

    }

    private async getVGList(req: Request, res: Response): Promise<void> {
      try {
        const getVGListTask = new GetVGListTask();
  
        const vgList = await getVGListTask.execute();
  
        this.respond(res, 200, vgList);
      } catch (e) {
        this.respond(res, 500);
      }
    }
  
    private async findVG(req: Request, res: Response): Promise<void> {
      try {
        const vgId = parseInt(req.params.id);
        const getVGListTask = new FindVGTask(vgId);
  
        const vg = await getVGListTask.execute();
  
        this.respond(res, 200, vg);
      } catch (e) {
        if ((<Error>e).message === 'Car not found.') {
          this.respond(res, 404);
        } else {
          this.respond(res, 500);
        }
      }
    }
  
    private async addVG(req: Request, res: Response): Promise<void> {
      try {
        const vgData = <AddVGData>req.body;
  
        const addVGTask = new AddVGTask(vgData);
  
        const vg = await addVGTask.execute();
  
        this.respond(res, 200, vg);
      } catch (e) {
        this.respond(res, 500);
      }
    }
  
    private async updateVG(req: Request, res: Response): Promise<void> {
      try {
        const vgData = <UpdateGameData>req.body;
  
        const updatevgTask = new UpdateVGTask(vgData);
  
        const updatedVG = await updatevgTask.execute();
  
        this.respond(res, 200, updatedVG);
      } catch (e) {
        if ((<Error>e).message === 'Car not found.') {
          this.respond(res, 404);
        } else {
          this.respond(res, 500);
        }
      }
    }
  
    private async deleteVG(req: Request, res: Response): Promise<void> {
      try {
        const vgId = parseInt(req.params.id);
        const deleteVGTask = new DeleteVGTask(vgId);
  
        await deleteVGTask.execute();
  
        this.respond(res, 200);
      } catch (e) {
        this.respond(res, 500);
      }
    }
  }