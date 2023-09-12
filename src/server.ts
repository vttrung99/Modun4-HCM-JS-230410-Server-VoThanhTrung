/* Load file .env */
import dotenv from 'dotenv';
dotenv.config();

/* Express */
import express from 'express';

/* Tạo ra đối tượng server */
const server = express();

/* Setup Cors */
import cors from 'cors';
server.use(cors());

/* Setup Body Parser */
import bodyParser from 'body-parser';
server.use(bodyParser.json())

/* Version api setup */
import routeApi from './routes';
import guard from './middlewares/guard';
server.use('/api', guard.ipAuthen, routeApi);
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
server.use("/test", async (req, res) => {
    try {
        let result = await prisma.categories.create({
            data: req.body

        })
        res.json(result)
    } catch (err) {
        console.log("err", err);

    }
})
/* Đẩy server ra port trên máy */
server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server on link: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`)
}) 