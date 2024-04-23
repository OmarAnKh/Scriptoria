import express from 'express'
import Rating from '../models/rating.js'
import authentication from "../middleware/authentication.js";

const router = new express.Router()

router.post('/rate', authentication, async (req,res)=>{
    const rate = new Rating({
        rating : req.body.rating,
        StoryId : '660c0ef9f7c89b9cfdd1aacb',
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


router.get('/rate', authentication, async (req, res)=>{
  const AccountId = req.user.id;
  const StoryId = req.query.StoryId;
  try{
      const rate = await Rating.findOne({StoryId, AccountId });
      if(!rate) return undefined;
      res.send(rate);
  }catch(e){
      res.status(500).send();
  }
});

router.get('/rates/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const countRates = await Rating.countDocuments({ StoryId: _id });
    const result = await Rating.aggregate([
        { $group: { _id: _id, averageRate: { $avg: "$rating" } } }
    ]);

    const averageRating = result[0]?.averageRate;
    res.status(200).send({ counts: { rates: countRates, avg: averageRating } })

  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch('/rate/:id', authentication, async(req, res) => {
    const updates = Object.keys(req.body);
    const isValidOperation = updates.includes("rating");
    if (!isValidOperation) {
      return res.status(400).send({ "error": "invalid update!" });
    }
    try {
      const rate = await Rating.findOne({AccountId : req.params.id ,StoryId: '65fb60a9334d75840746ae29' });
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