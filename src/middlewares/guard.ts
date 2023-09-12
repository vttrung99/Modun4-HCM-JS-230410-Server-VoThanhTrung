import { Request, Response, NextFunction } from "express"
import Text from '../text'
let ipList = [
    "::ffff:127.0.0.1",
    "58.187.191.113"
]
export default {
    ipAuthen: function (req: Request, res: Response, next: NextFunction){
        let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        if(ipList.find(ip => ip == String(ipAddress))){
            return next();
        }

        return res.status(213).json({
            status: false,
            message: Text(String(req.headers.language)).ipAcceptDenine,
            data: null
        })
    }
}