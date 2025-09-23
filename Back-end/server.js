//server file

//APIs for Slikk certification system

const express=require('express')
const app=express()


app.get('/', async (req,res)=>{
    res.send("Hello user")
})