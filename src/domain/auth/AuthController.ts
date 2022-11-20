import { Request, Response } from 'express';
import { getErrorMessage } from '../../common/GetErrorMessage';
import * as authService from './AuthService';

export default class AuthController {
  public async authenticate(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body; // associação por desestruturação.

    try {
      const user = await authService.loginUser(username, password);

      return res.send(user);
    } catch (error) {
      return res.status(401).send(getErrorMessage(error));
    }
  }
}
