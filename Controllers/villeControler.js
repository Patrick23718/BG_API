'use strict';

var fs = require('fs')
const Ville = require("../Models/Ville");


const createVille = async (req, res, next) => {
    const body = req.body
    
    const ville = new Ville(body);
    
    ville
        .save()
        .then((resultat) => {
          res.status(201).json(resultat);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
} 



const getVille  = async (req, res, next) => {
    Ville.find().exec().then(result => {
        console.log(result)
        res.status(200).send(result)
    })
    
}


const deleteVille = async (req, res, next) => {
    try {
        const id = req.params.id;
        
        await Ville.deleteOne({_id: id})
        
        res.status(200).send('Ok')
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);    }
}


const addVille = async (req, res, next) => {
    const id = req.params.id;
    var body = req.body.nom;

    Ville.updateOne(
        { _id: id }, 
        { $push: { subVille: body } }
    ).then((resultats) =>
    res.status(200).json(resultats)).catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Oups!! une erreur est survenue",
          error: err,
        });
      })
   
}

const popVille = async (req, res, next) => {

    const id = req.params.id
    var body = req.body.nom;
    
    Ville.updateOne(
        { _id: id }, 
        { $pull: { subVille: body } }
    ).then((resultats) => {
        res.status(200).json(resultats)
    })
    
    .catch((err) => {
        console.log(err);
        res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
        });
    })

}

function handleError(res, err) {
    console.log(err)
    return res.status(500).send({
        message: `${err.code} - ${err.message}`
    });
}




module.exports = {
    deleteVille,
    getVille,
    createVille,
    addVille,
    popVille
}