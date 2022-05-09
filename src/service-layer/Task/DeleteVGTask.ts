import videojuego from '../../domain-layer/entities/Videojuego';
import DatabaseConnection from '../../persistence-layer/DatabaseConnection';
import IAsyncTask from './IAsyncTask';

export default class DeleteVGTask implements IAsyncTask<void> {
    private vgId: number;

    public constructor(vgId: number){
        this.vgId = vgId;
    }

    public async execute(): Promise<void> {
        const databaseConnection = await DatabaseConnection.getInstance();
        const vgRepository = databaseConnection.getRepository(videojuego);

        await vgRepository.delete(this.vgId);
    }
}
