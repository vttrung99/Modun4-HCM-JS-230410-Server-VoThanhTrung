import userModel, {NewUser} from "../models/user.model";
import { Request, Response } from "express";
import Text from '../text'
import mail, {templates} from "../services/mail";
import jwt from "../services/jwt";
import ejs from 'ejs'
import path from 'path'
export default {
    confirmEmail: async function(req: Request, res: Response) {
       try {
            let tokenObj = jwt.verifyToken(String(req.params.token));
            if(tokenObj) {
                let modelRes = await userModel.inforById((tokenObj as any).id);
                if(modelRes.status) {
                    let modelUpdateRes = await userModel.update(modelRes.data?.id!, {emailConfirm: true, updateAt: new Date(Date.now())})
                        return res
                        .status(modelUpdateRes.status ? 200 : 213)
                        .send(modelUpdateRes.status ? await ejs.renderFile(path.join(__dirname, "../templates/emailActived.ejs")) : "Xác thực thất bại, vui lòng thử lại!")
                }
            }
            return res.status(500).json({
                messsage: Text(String(req.headers.language)).controllerErr
            })
       }catch(err) {
            return res.status(500).json({
                messsage: Text(String(req.headers.language)).controllerErr
            })
       }
    },
    authentication: async function(req: Request, res: Response) { 
        try {
            let tokenObj = jwt.verifyToken(String(req.headers.token));
            if(tokenObj) {
                let modelRes = await userModel.inforById((tokenObj as any).id);
                return res.status(modelRes.status ? 200 : 213).json(modelRes);
            }
        }catch(err) {
            return res.status(500).json({
                messsage: Text(String(req.headers.language)).controllerErr
            })
        }
    }
}