import express from 'express'
import Room from '../models/room.js';
import authentication from "../middleware/authentication.js";
import mongoose from 'mongoose';

const router = new express.Router()

router.post('/room', authentication, async (req,res)=>{
    const room = new Room({
        name : req.body.name,
        users : req.body.users
    })
    try{
        await room.save()
        res.send(room)
    } catch(error){
        console.log(error)
        res.status(400).send(error)
    }
})

router.get('/room/:userId', authentication, async(req, res)=>{
    const user = req.params.userId 
    try{
        const rooms = await Room.find({ users: { $in: [user] } }).populate('users')
        res.send(rooms)
    } catch(error){
        console.log(error)
        res.send(error)
    }
})

  

export default router