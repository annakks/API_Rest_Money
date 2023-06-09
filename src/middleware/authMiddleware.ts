import { NextFunction, Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-errors";
import { userRepository } from "../repositories/UserRepository";
import jwt from 'jsonwebtoken'

type JwtPayLoad = {
    idUser: number
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if(!authorization) {
        throw new UnauthorizedError( 'Usuário não autorizado' )
    }

    const token = authorization.split( ' ' )[1]

    const {idUser} = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayLoad

    const user = await userRepository.findOneBy({ idUser })

	if (!user) {
		throw new BadRequestError('Usuário não autorizado')
	}

    const { password: _, ...loggerUser } = user

    req.user = loggerUser

    next()
}