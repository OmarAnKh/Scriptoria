import express from 'express'
import Rating from '../models/rating.js'
import authentication from "../middleware/authentication.js";

const router = new express.Router()

router.post('/rate', authentication, async (req,res)=>{
    const rate = new Rating({
        rating : req.body.rating,
        StoryId : req.body.StoryId,
        AccountId : req.user.id
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
  const StoryId = req.params.id
  try{
      const rate = await Rating.findOne({StoryId, AccountId });
      if(!rate) return res.status(404).send();
      res.send(rate);
  }catch(e){
      res.status(500).send();
  }
});

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