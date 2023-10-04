const  express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')

const database = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"subash"
})

database.connect(()=>{
    console.log("Database connected successfully")
})
const application=express()
application.use(bodyParser.urlencoded({exteneded:true}))
application.use(bodyParser.json())
application.listen(2020,(err)=>{
    console.log("web site is running successfully")
})

application.get('',async(req,res)=>{
    res.send("welcome")
})

//GET
application.get('/read',async(req,res)=>{
    const sql="select * from subash_details"
    database.query(sql,(err,records)=>{
        if(err){
            res.status(404).json({"error":err.message})
            return
        }
        if(records.length==0){
            res.status(201).json({"message":"no records found"})
            return
        }
        res.status(200).json({records})
    })
})

//POST
application.post('/insert',async(req,res)=>{
    const {id,name,city} = req.body 
    const sql = "insert into subash_details values (?,?,?)"
    database.query(sql,[id,name,city],(err,result)=>{
        if(err){
            res.status(404).json({"error":err.message})
            return   
        }
        res.status(200).json({"success":result.affectedRows})
    })
})

//PUT
application.put('/update',async(req,res)=>{
    const {id,name,city} = req.body
    const sql = "update subash_details set name=?, city=? where id=?"
    database.query(sql,[name,city,id],(err,result)=>{
        if(err){
            res.status(404).json({"error":err.message})
            return
        }
        res.status(200).json({"message":result.affectedRows})
    })
})

//DELETE
application.delete('/delete/:id',async(req,res)=>{
    const sql = "delete  from subash_details where id=?"
    database.query(sql,[req.params.id],(err,result)=>{
        if(err){
            res.status(500).json({"error":err.message})
        }
        res.status(200).json({"message":result.affectedRows})
    })
})