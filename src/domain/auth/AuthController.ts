import { Request, Response } from 'express';
import { getErrorMessage } from '../../common/GetErrorMessage';
import * as authService from './AuthService';

export default class AuthController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body; // associação por desestruturação.

    try {
      const login = await authService.loginUser(username, password);
      return res.send(login);
    } catch (error) {
      return res.status(404).send(getErrorMessage(error));
    }
  }
}
