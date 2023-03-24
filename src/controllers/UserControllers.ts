import { Request, Response } from "express";
import { userRepository } from "../repositories/UserRepository";

export class UserController {
    //cria usuario
    async create(req: Request, res: Response) {
        const {name, email, password} = req.body

        if (!name || !email || !password) {
            return res.status(400).json({message: "Todos os campos são obrigatórios"})
        }
        try{
            const newUser = userRepository.create({
                name,
                email,
                password
            })

            await userRepository.save(newUser)

            return res.status(201).json(newUser);

        }catch (error){
            console.log(error);
            return res.status(400).json({message: "Internal Server Error"})
        }
    }
}