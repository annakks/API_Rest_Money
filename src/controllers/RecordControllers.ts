import { Request, Response } from "express";
import { recordRepository } from "../repositories/RecordRepository";
import { userRepository } from "../repositories/UserRepository";
import { authMiddleware } from "./../middleware/authMiddleware";
import { BadRequestError, UnauthorizedError } from "../helpers/api-errors";
import jwt from 'jsonwebtoken'

type JwtPayLoad = {
    id: number
}

export class RecordController {
    async listRecors(req: Request, res: Response) {

        try{
            const records = await recordRepository.find({})

            return res.json({records})

        }catch (error){
            console.log(error);
            return res.status(400).json({message: "Internal Server Error"})
        }
    }

    async create (req: Request, res: Response){

        const {type, name, value, date, observation} = req.body

        const { authorization } = req.headers

        if(!authorization) {
            throw new UnauthorizedError( 'Usuário não autorizado' )
        }

        const token = authorization.split( ' ' )[1]

        const {id} = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayLoad

        const user = await userRepository.findOneBy({ id })

	    if (!user) {
	    	throw new BadRequestError('Usuário não autorizado')
	    }

        const { password: _, ...loggerUser } = user


        const id_user = user.id

        try{
           const newRecord = recordRepository.create({ 
            type, name, value, date, observation, user: id_user
        })

            await recordRepository.save(newRecord)

            return res.status(200).json(newRecord)

        } catch (error) {
            console.log(error)
            return res.status(404).json({message: "Internal Sever Error"})
        }
    }

    async listRecordsUser(req: Request, res: Response) {

        const { authorization } = req.headers

        if(!authorization) {
            throw new UnauthorizedError( 'Usuário não autorizado' )
        }

        const token = authorization.split( ' ' )[1]

        const {id} = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayLoad

        const user = await userRepository.findOneBy({ id })

	    if (!user) {
	    	throw new BadRequestError('Usuário não autorizado')
	    }

        const { password: _, ...loggerUser } = user


        let id_user = loggerUser.id

        try{            
            const recordsUser = await recordRepository.findBy({user: id_user})

            return res.status(200).json(recordsUser)

        }catch (error){
            console.log(error);
            return res.status(400).json({message: "Internal Server Error"})
        }
    }

    async sumRecordsUser(req: Request, res: Response){

        const { authorization } = req.headers

        if(!authorization) {
            throw new UnauthorizedError( 'Usuário não autorizado' )
        }

        const token = authorization.split( ' ' )[1]

        const {id} = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayLoad

        const user = await userRepository.findOneBy({ id })

	    if (!user) {
	    	throw new BadRequestError('Usuário não autorizado')
	    }

        const { password: _, ...loggerUser } = user


        let id_user = loggerUser.id

        const recordsUser = await recordRepository.findBy({user: id_user})

        try {

            if (!recordsUser){
                throw new BadRequestError('Não há Registros')
            } 

            let totalReceita = 0;
            let totalDespesa = 0;

            recordsUser.forEach(item => {

            if (item.type === "receita") {
                let valor  = new Number(item.value).valueOf()
                totalReceita += valor

            } else if (item.type === "despesa") {
                let valor  = new Number(item.value).valueOf()
                totalDespesa += valor;
            }
            });

            const saldo = totalReceita - totalDespesa;

             return res.status(200).json(saldo)

        }catch (error) {
            console.log(error);
            return res.status(400).json({message: "Internal Server Error"})
        }
    }
}