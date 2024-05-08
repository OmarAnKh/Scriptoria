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
    const userId = req.params.userId 
    try{
        const rooms = await Room.find({ 'users.user': userId }).populate('users.user');
        if(!rooms || rooms.length===0) return res.status(404).send([])
        res.status(200).send(rooms)
    } catch(error){
        console.log(error)
        res.send(error)
    }
})

router.patch('/room', authentication, async (req, res)=>{
    const id = req.body.id
    try{
        const room = await Room.findById(id)
        if(!room) return res.status(404).send({})
            room.name = req.body.name
            room.users=req.body.users
            await room.save()
            res.status(200).send(room)
    }catch(error){
        res.status(500).send(error)
    }
})

router.delete('/room/:id', async (req, res)=>{
    const id = req.params.id
    try{
        const room = await Room.findByIdAndDelete(id)
        if(!room) return res.status(404).send(room)
            res.status(200).send(room)
    }catch(error){
        res.status(500).send(error)
    }
})

export default router