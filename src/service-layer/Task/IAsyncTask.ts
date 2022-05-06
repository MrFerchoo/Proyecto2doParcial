export default interface IAsyncTask<ReturnType> {
  execute(): Promise<ReturnType>;
} 