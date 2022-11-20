import { Request, Response } from 'express';
import { getErrorMessage } from '../../common/GetErrorMessage';
import * as authService from './AuthService';
import * as jwt from 'jsonwebtoken';

export default class AuthController {
  public async authenticate(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body; // associação por desestruturação.

    try {
      const user = await authService.loginUser(username, password);
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: '1d',
      });

      return res.json({
        user,
        token,
      });
    } catch (error) {
      return res.status(401).send(getErrorMessage(error));
    }
  }
}
