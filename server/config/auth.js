const jwt = require('jsonwebtoken')
const axios = require('axios')


const authRequest = (req,res,next) =>{
   
    const { accessToken,refreshToken } = req.cookies
   
   
    if(!accessToken) return res.status(401).json({message:'Failed to authenticate'})
    //valid access token
    jwt.verify(accessToken,process.env.JWT_SECRET_KEY,(err,data)=>{
        if(err) return res.status(500).json({message:"Failed to authenticate"})
        
        req.user = {id:data.userId}
        next()
    })
    //expired but valid refresh token

    

}

const authUser = (req,res,next) =>{
    if(!req.user){
        res.status(500).json({message:"Invalid Request"})
    }
}
const authMpesaRequest = async(req,res,next) =>{
    let consumer_key = process.env.CONSUMER_KEY;
        let consumer_secret = process.env.CONSUMER_SECRET;

        let url = process.env.OUATH_TOKEN_URL; 

        let buffer = new Buffer.from(consumer_key +  ":" + consumer_secret);

        let auth = `Basic ${buffer.toString('base64')}`;
      console.log(auth)

        try{

            let {data} = await axios.get(url,{
                "headers":{
                    "Authorization":auth
                }
            });
           

            
        req.token = data['access_token'];

            return next();
        }catch(err){
            // console.log({
            //     success:false,
            //     message:err['response']['statusText']
            // })
            console.log(err)

            // return res.send({
            //     success:false,
            //     message:err['response']['statusText']
            // });

        }

}

module.exports = {authRequest,authMpesaRequest}