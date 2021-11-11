'use strict';

var fs = require('fs')
const Prestation = require("../Models/Prestations");
// const PrestationType = require("../Models/PrestationType");

const createPrestation = async (req, res, next) => {
  
    const prestation = new Prestation({
        nom: req.body.nom,
        rate: req.body.rate,
        typePrestation: [],
    });
    
      prestation
        .save()
        .then((resultat) => {
          res.status(201).json(resultat);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
} 

const deletePrestation = async (req, res, next) => {

    const id = req.params.id;
    try {
        var test = await Prestation.findById(id)

        console.log(test);
        if(test == null) return res.status(404).send('Element non trouvé!!')
        test.typePrestation.forEach(element => {
            pop(element, id);
        });
        console.log(test);
        await Prestation.deleteOne({_id: id});
        
        res.status(200).send('Ok')
    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }

}

const getAllPrestaion = async (req, res, next) => {
    Prestation.find().sort({rate: 1}).exec()
    .then((resultats) =>
      res.status(200).json(resultats)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
}

const addPrestationType = async (req, res, next) => {
    const id = req.params.id;
    var body = {};
    body.nom = req.body.nom;
    body.photoURL = req.file.path;

    Prestation.updateOne(
        { _id: id }, 
        { $push: { typePrestation: body } }
    ).then((resultats) =>
    res.status(200).json(resultats)).catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Oups!! une erreur est survenue",
          error: err,
        });
      })
   
}

const getPrestationType = async (req, res, next) => {
    const pid = req.params.pid;
    const id = req.params.id;

    try {
        const one = await Prestation.find({ "typePrestation._id":  id, _id: pid })
        console.log(one);
        if(one == null){
            return res.status(404).send("Aucune prestation trouvée!");
        }
        
        res.status(200).send(one);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const removePrestationType = async (req, res, next) => {

    const id = req.params.id
    var body = {};
    body.nom = req.body.nom;
    body.photoURL = req.body.photoURL;
    body._id = req.body._id
    
    Prestation.updateOne(
        { _id: id }, 
        { $pull: { typePrestation: {_id: body._id} } }
    ).then((resultats) => {
        fs.unlink(body.photoURL, async function (err) {
            if(err){
                res.send(err)
            }else{
                
            }
        })
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

const pop = async (body, id) => {

    
    Prestation.updateOne(
        { _id: id }, 
        { $pop: { typePrestation: 1 } }
    ).then((resultats) => {
        fs.unlink(body.photoURL, async function (err) {
            if(err){
                res.send(err)
            }else{
                
            }
        })
    })
    
    .catch((err) => {
        console.log(err);
    })

}




module.exports = {
    createPrestation,
    addPrestationType,
    getAllPrestaion,
    getPrestationType,
    removePrestationType,
    deletePrestation
}
