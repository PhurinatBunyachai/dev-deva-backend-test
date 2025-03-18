import { Request, Response } from 'express';

export class HomeController {
  public index(req: Request, res: Response): void {
    res.send('Hello, TypeScript with Express in MVC pattern!');
  }
}