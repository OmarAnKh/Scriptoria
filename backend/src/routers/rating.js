import express from 'express'
import Rating from '../models/rating.js'
import authentication from "../middleware/authentication.js";
import mongoose from 'mongoose';

const router = new express.Router()

router.post('/rate', authentication, async (req,res)=>{
    const rate = new Rating({
        rating : req.body.rating,
        StoryId : req.body.StoryId,
        AccountId : req.user.id,
        privacy : req.body.privacy
    })
    try{
        await rate.save()
        res.send(rate)
    } catch(error){
        console.log(error)
        res.status(400).send(error)
    }
})

router.get('/rate/:id', authentication, async (req, res)=>{
  const AccountId = req.user.id;
  const StoryId = req.params.id;
  
  try{
      const rate = await Rating.findOne({StoryId, AccountId });
      if(!rate) return res.status(404).send();
      res.send(rate);
  }catch(e){
      res.status(500).send();
  }
});

router.get('/rates/:id', async (req, res) => {
  const { id } = req.params

  try {
    const countRates = await Rating.countDocuments({ StoryId: id });
    const result = await Rating.aggregate([
        { $match: { StoryId:  mongoose.Types.ObjectId.createFromHexString(id) } },
        { $group: { _id: null, averageRate: { $avg: "$rating" } } }
    ]);

    const averageRating = result[0]?.averageRate;
    res.status(200).send({ counts: { rates: countRates, avg: averageRating } })

  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch('/rate/:id', authentication, async(req, res) => {
    const AccountId = req.user.id;
    const StoryId = req.params.id
    try {
      const rate = await Rating.findOne({AccountId, StoryId});
      if (!rate) {
        return res.status(404).send();
      }
      rate.rating = req.body.rating;
      await rate.save();
      res.status(200).send(rate);
    } catch (error) {
      res.status(400).send(error);
    }
});

  

export default router