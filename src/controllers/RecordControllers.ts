import { Request, Response } from "express";
import { recordRepository } from "../repositories/RecordRepository";

export class RecordController {
    async create (req: Request, res: Response){
        const { type, name, value, date, observation} = req.body;

        try{
            const newRecord = recordRepository.create({
                type,
                name,
                value,
                date,
                observation
            })
            await recordRepository.save(newRecord);

            return res.status(201).json(newRecord);
        } catch(error){
            console.log(error);
            res.status(400).json({message: "Internal Server Error"});
        }
    } 
}