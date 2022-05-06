import { Application, Router, Response } from 'express';

export default abstract class BaseController {
  protected readonly path: string;

  protected readonly router: Router;

  public constructor(path: string) {
    this.path = path;
    this.router = Router();

    this.configureRouter();
  }

  protected abstract configureRouter(): void;

  public mount(app: Application): void {
    app.use(this.path, this.router);
  }

  public respond(res: Response, statusCode: number, data?: unknown): void {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });

    if (data) {
      res.end(JSON.stringify(data));
    } else {
      res.end();
    }
  }
}
