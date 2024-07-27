let data = [
    {name:'sanjeev bhawra', Age:'19' , email: 'shanubhawra@gmail.com'},
    {name:'tamana bhawra', Age:'17`' , email: 'tamana@gmail.com'},
    {name:'sunakashi bhawra', Age:'14' , email: 'sunakashi@gmail.com'},
    {name:'mukul', Age:'28' , email: 'mukul@gmail.com'}
]
module.exports=data;




// const server = http.createServer((request, response) => {
//     const auth = nodemailer.createTransport({
//         service: "gmail",
//         secure : true,
//         port : 465,
//         auth: {
//             user: "youremail@gmail.com",
//             pass: "your_password"

//         }
//     });

//     const receiver = {
//         from : "youremail@gmail.com",
//         to : "youremail@gmail.com",
//         subject : "Node Js Mail Testing!",
//         text : "Hello this is a text mail!"
//     };

//     auth.sendMail(receiver, (error, emailResponse) => {
//         if(error)
//         throw error;
//         console.log("success!");
//         response.end();
//     });
    
// });

// server.listen(8080);