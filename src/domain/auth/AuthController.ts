import { Request, Response } from 'express';
import * as userService from '../user/UserService';

export default class AuthController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body; // associação por desestruturação.

    try {
      const login = await userService.loginUser(username, password);
      return res.send(login);
    } catch (error) {
      return res.status(404).send(getErrorMessage(error));
    }
  }
}
