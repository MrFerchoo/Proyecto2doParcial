import Videojuego from '../../domain-layer/entities/Videojuego';
import DatabaseConnection from '../../persistence-layer/DatabaseConnection';
import IAsyncTask from './IAsyncTask';

export default class GetCarListTask implements IAsyncTask<Videojuego[]> {
    public async execute(): Promise<Videojuego[]> {
        const databaseConnection = await DatabaseConnection.getInstance();
        const vgRepository = databaseConnection.getRepository(Videojuego);
        return vgRepository.find();
    }
}
