import { Request, Response } from "express";
import { UsersService } from "@/modules/users/services/user.services";

export class UsersController {
  constructor() {}

  listUsers(req: Request, res: Response) {
    const usersService = UsersService.getInstance();
    const users = usersService.list(100, 0);

    res.status(200).send(users);
  }

  getUserById(req: Request, res: Response) {
    const usersService = UsersService.getInstance();
    const user = usersService.readById(req.params.userId);
    res.status(200).send(user);
  }

  createUser(req: Request, res: Response) {
    const usersService = UsersService.getInstance();

    console.log(req?.body);

    const userId = usersService.create(req.body);
    res.status(200).send({ id: userId });
  }

  patch(req: Request, res: Response) {
    const usersService = UsersService.getInstance();
    usersService.patchById(req.body);
    res.status(204).send(``);
  }

  put(req: Request, res: Response) {
    const usersService = UsersService.getInstance();
    usersService.updateById(req.body);
    res.status(204).send(``);
  }

  removeUser(req: Request, res: Response) {
    const usersService = UsersService.getInstance();
    usersService.deleteById(req.params.userId);
    res.status(204).send(``);
  }
}
