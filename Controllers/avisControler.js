'use strict';

const {adminDb: admin} = require('../DataBaseConfig/admin-db');
const db = admin.firestore();

const createAvis = async (req, res, next) => {
    try {
        const uid = req.params.uid;
        const tarifId = req.params.tarifId;
        const commentaire = req.body.commentaire;
        let note = req.body.note;

       if(!commentaire || !note){
           return res.status(400).send({message: 'Champs manquant'});
       }
       note = parseFloat(note);
       const ref = await db.collection('avis').add({
            uid: uid,
            tarifId: tarifId,
            note: note,
            commentaire: commentaire,
            date: Date.now()
        });
        return res.status(201).send({ref})

    } catch (err) {
        return handleError(res, err);
    }
}

const getAllTarifAvis  = async (req, res, next) => {
    try {
        const TId = req.params.tarifId;
        const avisSnapshot = await db.collection('avis').get()
        const avis = []
        avisSnapshot.forEach((doc) => {
            let data = doc.data()
            if(data.tarifId == TId){
                avis.push({
                    id: doc.id,
                    uid: data.uid,
                    tarifId: data.tarifId,
                    note: data.note,
                    commentaire: data.commentaire,
                    date: data.date
                })
            }
        })
        res.send(avis)
    } catch (err) {
        return handleError(res, err);
    }
}

const deleteAvis = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) return  res.status(404).send({message: 'identifiant non forni'})
        
        await db.collection('avis').doc(id).delete()
         
    } catch (err) {
        return handleError(res, err);
    }
}

function handleError(res, err) {
    console.log(err)
    return res.status(500).send({
        message: `${err.code} - ${err.message}`
    });
}


module.exports = {
    createAvis,
    getAllTarifAvis,
    deleteAvis
}