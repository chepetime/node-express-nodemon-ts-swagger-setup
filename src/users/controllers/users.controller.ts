import { Request, Response } from "express";

export class UsersController {
  listUsers(req: Request, res: Response) {
    res.status(200).send(`Get to users`);
  }

  getUserById(req: Request, res: Response) {
    res.status(200).send(`Get to user ${req.params.userId}`);
  }

  createUser(req: Request, res: Response) {
    res.status(200).send(`Post to user ${req.params.userId}`);
  }

  patch(req: Request, res: Response) {
    res.status(200).send(`Patch to user ${req.params.userId}`);
  }

  put(req: Request, res: Response) {
    res.status(200).send(`Put to user ${req.params.userId}`);
  }

  removeUser(req: Request, res: Response) {
    res.status(200).send(`Delete to user ${req.params.userId}`);
  }
}
