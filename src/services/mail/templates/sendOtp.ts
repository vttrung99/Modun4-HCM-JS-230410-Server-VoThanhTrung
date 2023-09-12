function generateTemplate(otp: string, time: Date) { 
    return`
        <h1>OTP của bạn hiệu lực trong 5 phút</h1>
        <h2>${otp}</h2>
        <h3>Time create: ${time.getFullYear()}</h3>
    `
}
export default generateTemplate