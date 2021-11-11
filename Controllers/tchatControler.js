'use strict';

const {adminDb: admin} = require('../DataBaseConfig/admin-db');
const db = admin.firestore();

const sendMessage = async (req, res, next) => {
    try {
        let count = 0
        var message;
        var fileURL;
        if(req.body.message) {
            count = count + 1
            message = req.body.message
        }

        if(req.file){
            fileURL = req.file.path
            count = count + 1
        } 
        console.log(req.body.message)
        const coiffeuseId = req.body.coiffeuse;
        const clientId = req.body.client

        if(!coiffeuseId || !clientId){
            return res.status(400).send({message: 'Champs manquant'});
        }
        // if(count == 0){
        //     return res.status(400).send({message: 'Pas de contenu'}); 
        // }

        let data = {}

        if(req.body.message){
            if(req.file) {
                data = {
                    coiffeuseId: coiffeuseId,
                    clientId: clientId,
                    message: message,
                    fileURL: fileURL,
                    is_read: false,
                    date: Date.now()
                }
            } else {
                data = {
                    coiffeuseId: coiffeuseId,
                    clientId: clientId,
                    message: message,
                    is_read: false,
                    date: Date.now()
                }
            }

        }else{
            if(req.file){
                data = {
                    coiffeuseId: coiffeuseId,
                    clientId: clientId,
                    fileURL: fileURL,
                    is_read: false,
                    date: Date.now()
                }
            } else {
                return res.status(400).send({message: "Vous devez definir un contenu"})
            }
        }
        const ref = await db.collection('tchat').add(data);
        return res.status(201).send(ref);
    } catch (error) {
        return handleError(res, error);
    }
}

const getUserMessages = async (req, res) => {
    try {
        const uid = req.params.uid;
        const messageSnapshot = await db.collection('tchat').orderBy('date', 'desc').get();
        const message = []
        messageSnapshot.forEach((doc) => {
            let data = doc.data()
            if(uid == data.coiffeuse && uid == data.client){
                message.push({
                    id: doc.id,
                    coiffeuseId: data.coiffeuseId,
                    clientId: data.clientId,
                    fileURL: data.fileURL,
                    is_read: data.is_read,
                    date: data.date
                })
            }
        })
        console.log(message);
        return res.send(message)
    } catch (error) {
        return handleError(res, error)
    }
}

function handleError(res, err) {
    console.log(err)
    return res.status(500).send({
        message: `${err.code} - ${err.message}`
    });
}

module.exports = {
    sendMessage,
    getUserMessages
}