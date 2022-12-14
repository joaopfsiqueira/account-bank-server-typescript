import { Request, Response } from 'express';
import { getErrorMessage } from '../../common/GetErrorMessage';
import * as authService from './AuthService';
import * as jwt from 'jsonwebtoken';

export default class AuthController {
  public async authenticate(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body; // associação por desestruturação.

    try {
      const user = await authService.loginUser(username, password);
      const token = jwt.sign(
        { username: user.username },
        process.env.SECRET_KEY,
        {
          expiresIn: '1d',
        }
      );

      delete user.password;
      return res.json({
        username,
        token,
      });
    } catch (error) {
      return res.status(401).send(getErrorMessage(error));
    }
  }
}
