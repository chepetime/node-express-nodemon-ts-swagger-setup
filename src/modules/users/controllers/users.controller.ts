import { Request, Response } from "express";
import { hash } from "argon2";

import { UsersService } from "@/modules/users/services/user.services";

export class UsersController {
  constructor() {}

  async listUsers(req: Request, res: Response) {
    const usersService = UsersService.getInstance();
    const users = usersService.list(100, 0);

    res.status(200).send(users);
  }

  async getUserById(req: Request, res: Response) {
    const usersService = UsersService.getInstance();
    const user = await usersService.readById(req.params.userId);
    res.status(200).send(user);
  }

  async createUser(req: Request, res: Response) {
    const usersService = UsersService.getInstance();
    req.body.password = await hash(req.body.password);
    const userId = await usersService.create(req.body);
    res.status(201).send({ id: userId });
  }

  async patch(req: Request, res: Response) {
    const usersService = UsersService.getInstance();
    usersService.patchById(req.body);
    res.status(204).send(``);
  }

  async put(req: Request, res: Response) {
    const usersService = UsersService.getInstance();
    usersService.updateById(req.body);
    res.status(204).send(``);
  }

  async removeUser(req: Request, res: Response) {
    const usersService = UsersService.getInstance();
    usersService.deleteById(req.params.userId);
    res.status(204).send(``);
  }
}
