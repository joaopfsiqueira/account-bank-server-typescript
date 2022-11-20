import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export default function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  //se não houver
  if (!authorization) {
    return res.status(401).send('Unauthorized');
  }

  //pegando o token do request.
  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY); //comparando token depois de descripitografar o token com a nossa secret.
    console.log(data);
  } catch {
    return res.status(401).send('Unauthorized');
  }
}
