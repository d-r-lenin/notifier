const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'));

const publicKey = 'BJ0uxv6HXwC0rKeLfOsXrJ5_3_D_exLJHYO_FzU9KR_y-KIzEbLSohQTxDG4FQ_DBTa3WjJMixxsN27pskrYp4g'
const privateKey = 'yWCSzffb_f3MGiAAEicVYld7dyoosw8nuDYwnlqB0wU'
let subscription;

app.get('/',(req,res)=>{
   res.sendFile('index.html');
});

app.post('/subscribe',(req,res)=>{
   console.log('working');
   subscription = req.body;
   console.dir(subscription);
    const opts = {
       vapidDetails : {
          subject: 'mailto:drlenin2002@gmail.com',
          publicKey: publicKey,
          privateKey: privateKey
       },
       TTL: 336000,
       headers : {
          "Content-Type": "application/json"
       }
    }
    // const payload = JSON.stringify({ title: "Push Test" , body : "hello world" });
    res.status(201).json({});
    // webpush
    //   .sendNotification(subscription, payload,opts)
    //   .then(()=> console.log('success'))
    //   .catch(err => console.error(err));
})

app.get('/get',(req,res)=>{
   console.log('get::working');
   console.dir(subscription);
   const payload = JSON.stringify( {title: "Push" , body : "hello",vibrate: [200, 100, 200, 100, 200, 100, 400] } );
   res.status(201).json({})
   const opts = {
      vapidDetails : {
        subject: 'mailto:drlenin2002@gmail.com',
        publicKey: publicKey,
        privateKey: privateKey
      },
      TTL: 336000,
      headers : {
        "Content-Type": "application/json"
      }
   }
   webpush.sendNotification(subscription,payload,opts).catch(err => console.error(err))
})

let port;
app.listen(port = process.env.PORT||5000,()=>{
   console.log('PORT:'+port);
})
