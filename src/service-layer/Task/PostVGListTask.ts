import Videojuego from '../../domain-layer/entities/Videojuego';
import DatabaseConnection from '../../persistence-layer/DatabaseConnection';
import IAsyncTask from './IAsyncTask';

export type AddVGData = {
    name: string,
    year: string,
};

export default class PostVGTask implements IAsyncTask<Videojuego> {
    private addVGData: AddVGData;

    public constructor(addVGData: AddVGData){
        this.addVGData = addVGData;
    }

    public async execute(): Promise<Videojuego> {
        const databaseConnection = await DatabaseConnection.getInstance();
        const vgRepository = databaseConnection.getRepository(Videojuego);

        const videogame = vgRepository.save(this.addVGData)
        
        return videogame;
    }
}