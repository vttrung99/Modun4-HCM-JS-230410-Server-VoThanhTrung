import purchaseModel from "../models/purchases.model";
import { Request, Response } from "express";
import otps from "../services/otps";
import mail, {templates} from "../services/mail";
export default {
    createGuestReceipt: async function(req: Request, res: Response) {
        try {
            let newGuestReceipt = req.body.newGuestReceipt;
            let guestReceiptDetailList = req.body.guestReceiptDetailList;
            let modelRes = await purchaseModel.createGuestReceipt(newGuestReceipt, guestReceiptDetailList);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        }catch(err){
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
    findGuestReceipt: async function(req: Request, res: Response) {
        console.log("req", req.body)
        try {
            let modelRes = await purchaseModel.findGuestReceipt(String(req.body.guestEmail));
            if(req.body.otp) {
                /* có otp */
                let result = otps.checkOtp(String(req.body.guestEmail), String(req.body.otp))
                if (result) {
                    return res.status(modelRes.status ? 200 : 213).json(modelRes);
                }
            }else {
                console.log("chưa có otp")
                /* chưa có otp */
                if(modelRes.status && modelRes.data != null) {
                    console.log("chưa có 222", modelRes.data)
                    if(modelRes.data?.length > 0) {
                        let otpObj = otps.createOtp(String(req.body.guestEmail), 5);
                        if(otpObj) {
                            /* gửi otp tới cho khách */
                            let mailSent = await mail.sendMail({
                                subject: "Gửi OTP",
                                to: `${String(req.body.guestEmail)}`,
                                html: templates.sendOtp(otpObj?.otp, new Date(otpObj?.createAt))
                            })
                            return res.status(mailSent ? 200 : 213).json({
                                message: `${mailSent ? "OTP đã gửi tới email" : "Lỗi dịch vụ"}`
                            });
                        }
                    }else {
                        return res.status(213).json({
                            message: "Quý khách chưa phát sinh giao dịch!"
                        });
                    }
                }
            }
            return res.status(213).json({
                message: "OTP Không hợp lệ!"
            });
        }catch(err){
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
    getReceipt: async function(req: Request, res: Response) {
        console.log("vào getReceipt");
        
        try {
      
            let modelRes = await purchaseModel.getReceipt();
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        }catch(err){
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
}
//hình như trong này á a
