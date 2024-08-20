import { NextFunction, Request, Response } from 'express'

export function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(404).send('Your page is not found hehe')
}
