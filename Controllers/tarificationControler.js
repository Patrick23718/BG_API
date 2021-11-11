'use strict';

const { where } = require("../Models/Tarification");
const Tarif = require("../Models/Tarification");
const Prestation = require("../Models/Prestations");
const nodemon = require("nodemon");
const PrestationType = require("../Models/PrestationType");

const createTarification = async (req, res, next) => {
    const uid = req.body.uid;
    const prix = req.body.prix
    const prestation = req.body.prestation
    const typePrestation = req.body.typePrestation

    const tarif = new Tarif({
        uid: uid,
        prix: prix,
        prestation: prestation,
        typePrestation: typePrestation
    });
    
    tarif
        .save()
        .then((resultat) => {
          res.status(201).json(resultat);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
} 

const getAllCoiffeuseTarification = async (req, res, next) => {
    const uid = req.params.uid;
    
    try {
        var tarif = [];
        var body
        const one = await Tarif.find().where("uid").equals(uid)
        console.log("longueur " + one.length)
        for (var j = 0; j < one.length; j++){
            body = await prestation(one[j].prestation, one[j].typePrestation)
            if (body == null){
                
            }else{
                console.log(body)
                tarif.push({
                    prestation: one[j].prestation,
                    prestationType: one[j].prestationType,
                    uid: one[j].uid,
                    prix: one[j].prix,
                    nom: body.nom,
                    photoURL: body.photoURL
                })
                // console.log(tarif);
            }
        }
        // await one.forEach( async (elt) => {
        //     body = null;
        //     body = await prestation(elt.prestation, elt.typePrestation)
            
        //     if (body == null){
                
        //     }else{
        //         console.log(body)
        //         tarif.push({
        //             prestation: elt.prestation,
        //             prestationType: elt.prestationType,
        //             uid: elt.uid,
        //             prix: elt.prix,
        //             nom: body.nom,
        //             photoURL: body.photoURL
        //         })
        //         console.log(tarif);
        //         res.status(200).send(tarif);
        //     }
        // })
        console.log(tarif);
        res.status(200).send(tarif);
    } catch (error) {
        console.log(error);
          res.status(500).json(error);
    }
}

const getCoiffeuseTarification = async (req, res, next) => {
    
}

const updateTarification = async (req, res, next) => {
   
}

const deleteTarification = async (req, res, next) => {
    
}

async function prestation(pid, id) {

    // console.log(pid + " " + id)

    var body

    try {
        const one = await Prestation.findById(pid)
        // console.log('one ' + one);
        if(one == null){
            return null;
        }
        var test = false
        var i = 0
        one.typePrestation.forEach(elt => {
            // console.log(i + ' ' + elt._id)
            i++
            if(elt._id.equals(id)){
                test = true,
                body = elt
                // console.log('ok ' + elt)
            }
        })

        if(test){
            // console.log('voila ' + body)
            return body

        }else{
            return null
        }
        
    } catch (error) {
        return null;
    }
}


function handleError(res, err) {
    console.log(err)
    return res.status(500).send({
        message: `${err.code} - ${err.message}`
    });
}




module.exports = {
    createTarification,
    getCoiffeuseTarification,
    getAllCoiffeuseTarification,
    updateTarification,
    deleteTarification
}