import { AppDataSource } from "../data-source";
import { Record } from "../entities/Record";

export const recordRepository = AppDataSource.getRepository(Record)