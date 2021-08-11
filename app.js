const express = require('express')
const app = express()

const questions = require('./Questions/script')

const port = 3000

app.get('/ques1',(req,res)=>{
    questions.ques1().then((data)=>{
        res.send(data)
    })
})

// pass coordinates in query string as below
// localhost:3000/ques2?x1=7&y1=3&x2=4&y2=6
app.get('/ques2',(req,res)=>{
    const {x1,y1,x2,y2} = req.query
    console.log(x1,y1,x2,y2)
    res.send(questions.ques2(x1,y1,x2,y2))
})

app.listen(port,()=>{
    console.log("Server is up and listening to port:",port)
})