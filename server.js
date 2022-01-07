const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'test'
  }
});

  db.select('*').from('users').then(data=>{
    console.log(data);
  })



const dataBase = {
  users:[
    {
      id:1,
      name:"harp",
      email:"harp@gmail.com",
      password:"123"
    },
    {
      id:2,
      name:"tim",
      email:"tim@gmail.com",
      password:"abc"
    }
  ]
}


app.use(bodyParser.json())
app.use(cors())


app.get('/',(req,res)=>{
  res.json(dataBase.users)
})

app.post('/signin',(req, res)=>{
    if (req.body.email === dataBase.users[0].email && 
      req.body.password === dataBase.users[0].password){
      res.send("hiiii")
    }
    else{
      res.json("sorry try again")
    }
  })

app.post('/register', (req,res)=>{
  const {email,name,password } = req.body;
  dataBase.users.push({
      id:6,
      name:name,
      email:email,
      password:password
  })  
  res.json(dataBase.users[dataBase.users.length-1])
})

app.listen(5000,()=>{
  console.log("listening")
})