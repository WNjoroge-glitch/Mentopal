const express = require('express')
const router = express.Router()
const {authMpesaRequest} = require('./config/auth')
const axios = require('axios')
const datetime = require('node-datetime')

router.get('/',authMpesaRequest,async(req,res)=>{
    const token = req.token
    const auth = `Bearer ${token}`

    // console.log(auth)
    const {BusinessShortCode,TransactionType,Amount,PartyA,PartyB,PhoneNumber,CallBackURL,AccountReference,TransactionDesc} = req.body
   
   
    const Year = new Date().getFullYear();
   let Month = new Date().getMonth() + 1;
   Month = Month < 10 ? `0${Month}` : Month;
    let date = new Date().getDate();
    date = date < 10 ? `0${date}` : date
    let Hour = new Date().getHours();
    Hour = Hour < 10 ? `0${Hour}` : Hour;
    let Minute = new Date().getMinutes()
    Minute = Minute < 10 ? `0${Minute}` : Minute;
    let Second = new Date().getSeconds();
    Second = Second < 10 ? `0${Second}` : Second;
    //const TimeStamp = `${Year}${Month}${date}${Hour}${Minute}${Second}`

    const timeStamp = () => {
        const dt = datetime.create();
        const formattedDate = dt.format('YmdHMS')
    
        return formattedDate
    }
    const newPassword = () => {


        const passString = BusinessShortCode + process.env.PASSKEY + timeStamp()
        const base64EncodedPassword = Buffer.from(passString).toString('base64')
    
        return base64EncodedPassword
    }
   
    

    
    //const Password = Buffer.from(`${BusinessShortCode}${process.env.PASSKEY}${TimeStamp}`).toString('base64')
  
   
   

   

    try {
        const {data} = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',{
            BusinessShortCode:174379,
            Password:newPassword(),
           Timestamp:timeStamp(),
            TransactionType:TransactionType,
            Amount:1,
            PartyA:254708374149,
            PartyB:174379,
            PhoneNumber:254708374149,
            CallBackURL:CallBackURL,
            AccountReference:AccountReference,
            TransactionDesc:TransactionDesc
        },{
            "headers":{
                "Authorization":auth
            }
        })
        res.send(data)
    } catch (error) {
        console.log(error)
    }


})

router.post('/callback',(req,res)=>{
    console.log(req.body)
})





module.exports = router