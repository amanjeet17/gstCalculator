const express = require('express');
const router = express.Router();
const request = require('request');
const mongoose = require('mongoose');


// Trustchekerguest Model
const Trust = require('../../models/Trust');

// @route   POST api/resume/submit
router.post('/submit',(req,res)=>{
  console.log("submited data",req.body);
  const dataFields ={};
  dataFields.name = req.body.name;
  dataFields.price = parseFloat(req.body.price).toFixed(2);
  dataFields.gstSlab = parseFloat(req.body.gstSlab).toFixed(2);
  request(`http://api.mathjs.org/v4/?expr=${dataFields.price}*${dataFields.gstSlab}/100`,function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log("body",body)
    dataFields.totalPrice = (parseFloat(body) + parseFloat(dataFields.price)).toFixed(2)
    console.log("DATA going to DB",dataFields);
    new Trust(dataFields).save()
    .then(trust =>{
      console.log("Saved itemFields",dataFields)
      res.json({dataFields})
    })
    .catch(err => {
      console.log("error while saving data",err);
      res.json({x:"failed"});
     });
   }
   else{
     console.log("error in api request",error);
   }
  });

});


// @route   GET api/resume/all
router.get('/all',(req,res)=>{
    Trust.find().then(trust =>{
      if(!trust){
        let eror ={}
        eror.name = "Get All error"
        res.json(eror);
      }
      else{
        console.log("Get All Success",trust);
        res.json(trust);
      }

    })
});


module.exports = router;
