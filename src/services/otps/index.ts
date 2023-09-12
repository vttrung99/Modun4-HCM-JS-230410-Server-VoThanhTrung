import fs from 'fs'
import path from 'path'
import methods from "../../utils/methods"
interface OtpObj {
    email: string;
    otp: string;
    createAt: number;
    activeTime: number;
}


function cleanOtp(otp: OtpObj): boolean {
    const currentTime = Date.now();
    const otpCreationTime = otp.createAt;
    const activeTime = otp.activeTime * 60 * 1000; // Chuyển đổi thành mili giây
    return (currentTime - otpCreationTime) < activeTime
}
export default {
    createOtp: function(email: string, activeTime: number) {
        try {
            let dataOtp = JSON.parse(fs.readFileSync(path.join(__dirname, "otp.json"), 'utf-8') ?? "[]");
            let newOtp = {
                email,
                otp: methods.generateOTP(),
                createAt: Date.now(),
                activeTime
            }
            dataOtp.push(newOtp);
            fs.writeFileSync(path.join(__dirname, "otp.json"), JSON.stringify(dataOtp))
            return newOtp
        }catch(err) {
            return false
        }
    },
    checkOtp: function(email: string, otp: string) {
        try {
            let dataOtp: OtpObj[] = JSON.parse(fs.readFileSync(path.join(__dirname, "otp.json"), 'utf-8') ?? "[]");
            let tempOtpArray:OtpObj[] = [];
            let result = false;
            for (let i in dataOtp) {
                if(cleanOtp(dataOtp[i])) {
                    if(dataOtp[i].email == email && dataOtp[i].otp == otp) {
                        result = true
                        continue
                    }
                    tempOtpArray.push(dataOtp[i])
                }
            }
            fs.writeFileSync(path.join(__dirname, "otp.json"), JSON.stringify(tempOtpArray))
            return result
        }catch(err) {
            return false
        }
    }
}