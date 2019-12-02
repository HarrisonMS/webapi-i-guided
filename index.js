// import express from "express";// ES modules
// in Node.js we'll import files using this syntax
const express = require("express"); // commonjs modules

const db = require("./data/hubs-model.js");  //1 import database file

const server = express();

server.use(express.json()); // !!!!!!!!!!!needed to pars JSON from the body!!!!!!!!!!!1

server.get(`/`, (req, res) => {
    res.send({api: "up and running..."})
    //res.end(message ) will send response but doesnt actually send data... it ends loops
})

// list of hubs Get to /hubs 2: implement endpoint
server.get(`/hubs`, (req, res) => {
    // get the list of hubs from the database
    db.find()
    .then(hubs => {
        res.status(200).json(hubs);//.json and .send are the same thing but json has message to client
    })
    .catch(error => {
        console.log("error on GET /hubs", error)// 500 sever error
        res.status(500).json({errorMessage:"error getting list of hubs from database"})//write code for humans not computer optimized for visibility useing json instead of .send()

    })
})

// add a hub
server.post("/hubs", (req, res) => {
    //get the data the client sent
    const hubData = req.body;// express doesnt know how to pars JSON
    //call the db and add the hub
    db.add(hubData)
    .then(hub => {
        res.status(201).json(hub);
    })
    .catch(error =>{
        console.log("error on POST /hubs", error);
        res.status(500).json({errorMessage: "error adding the hub"})
    })
    
    
    
    //// afternoon project will be .insert
})

// remove a hub by it's id
server.delete('/hubs/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(removed => {
        if(removed){
            // there was no hub with that id
            res.status(404).json({message: "hub not found", removed})
        }else{
            res.status(200).json({message: "hub added succesfully"})
        }
    })
    .catch(error =>{
        console.log("error on delette /hubs/:id", error);
        res.status(500).json({errorMessage: "error removingthe hub"})
    })
})
// update a hub, passing the id and the changes









// server.delete(`/`, (req, res0 => {

// }))

const port = 4000;
server.listen(port, () => console.log(`\n API running on port ${port}\n`)
);