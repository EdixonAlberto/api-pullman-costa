import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

const errorHandler = (
  error: TError | Error,
  _: Request,
  res: Response,
  next: NextFunction
): void => {
  // It is checked if the headers were sent
  if (res.headersSent) {
    console.error('>> HANDLING_EXPRESS')
    // Error handling is delegated to Express
    return next(error)
  }

  // Error handling personalized
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    ...error
  })
}

export { errorHandler }
