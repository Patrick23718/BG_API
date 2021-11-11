'use strict';

const Planning = require("../Models/Planning");

const addPlaning = async (req, res, next) => {
    
        const uid = req.body.uid;
        const date = req.body.date;
        const plage = req.body.plage;

        const newplanning = new Planning({
            uid: uid,
            date: date,
            plage: plage
        });
    
        newplanning
        .save()
        .then((resultat) => {
          res.status(201).json(resultat);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
        
}

const getCoiffeusePlaning = async (req, res, next) => {
    const uid = req.params.uid;
    const date = req.params.date;
    Planning.find()
    .where('uid').equals(uid)
    .where('date').equals(date)
    .exec().then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
        
}

const deleteCoiffeusePlaning = async (req, res, next) => {
    const uid = req.params.uid;
    const date = req.params.date;
    const plage = req.params.plage;
    try {
        var plannig = await Planning.deleteOne()
        .where('uid').equals(uid)
        .where('date').equals(date)
        .where('plage').equals(plage);

        // if(plannig == null) return res.status(404).send('Aucune plage horaire trouver')
        // console.log(plannig);
        // const id = plannig._id;

        // const del = await Planning.deleteOne({_id: id})

        res.status(200).json(plannig);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
        
}

function handleError(res, err) {
    console.log(err)
    return res.status(500).send({
        message: `${err.code} - ${err.message}`
    });
}

module.exports = {
    addPlaning,
    getCoiffeusePlaning,
    deleteCoiffeusePlaning
}