'use strict';

var fs = require('fs')
const Galerie = require("../Models/Galerie");


const createGalerie = async (req, res, next) => {
    
    const galerie = new Galerie({
        uid: req.params.uid,
        photoURL: req.file.path,
    });
    
    galerie
        .save()
        .then((resultat) => {
          res.status(201).json(resultat);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
} 



const getGalerie  = async (req, res, next) => {
    const uid = req.params.uid;
    Galerie.find().where('uid').equals(uid).exec().then(result => {
        console.log(result)
        res.status(200).send(result)
    })
    
}


const deleteGalerie = async (req, res, next) => {
    try {
        const id = req.params.id;
        const uid = req.params.uid
        const test = await Galerie.findById(id)
        if(test == null) return res.status(404).send("Not found")
        if(test.uid != uid) return res.status(404).send("Vous n'avez pas l'autorisation")
        
        await Galerie.deleteOne({_id: id})
        fs.unlink(test.photoURL, async function (err) {
            if(err){
                throw err;
            }
        });
        res.status(200).send('Ok')
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);    }
}

function handleError(res, err) {
    console.log(err)
    return res.status(500).send({
        message: `${err.code} - ${err.message}`
    });
}




module.exports = {
    deleteGalerie,
    getGalerie,
    createGalerie
}