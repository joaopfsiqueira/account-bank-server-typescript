import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

// criando interface para o retorno do "Data" mais abaixo
interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

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
    const { id } = data as TokenPayload; // criamos uma interface para esse payload.

    // foi preciso criar um tipo customizavel dentro do req do express. @types/
    req.userId = id;

    return next();
  } catch {
    return res.status(401).send('Unauthorized');
  }
}
