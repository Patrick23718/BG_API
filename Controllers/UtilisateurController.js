"use strict";

const { adminDb: admin } = require("../DataBaseConfig/admin-db");
const db = admin.firestore();
const Utilisateur = require("../Models/Utilisateur");

const createUser = async (req, res, next) => {
  try {
    const nom = req.body.nom;
    const email = req.body.email;
    const password = req.body.password;
    const telephone = req.body.telephone;
    const role = req.body.role;

    if (!nom || !email || !password || !telephone) {
      return res.status(400).send({ message: "Champs manquant" });
    }
    if (!["client", "coiffeuse"].includes(role))
      return res.status(400).send({ message: "Role inconnu" });

    if (role == "coiffeuse") {
      const ville = req.body.ville;
      const biographie = req.body.biographie; // 0 pour non valider(par défaut) et 1 pour valider

      if (!ville || !biographie) {
        return res.status(400).send({ message: "Champs manquant" });
      }
    }

    const user = await admin.auth().createUser({
      displayName: nom,
      email: email,
      password: password,
      phoneNumber: telephone,
    });
    await admin.auth().setCustomUserClaims(user.uid, { role });
    console.log("ok");

    if (role == "coiffeuse") {
      const ref = await db.collection("coiffeuses").doc(user.uid).set({
        ville: req.body.ville,
        biographie: req.body.biographie,
        status: 0,
      });
      return res.status(201).send({
        ref: ref.id,
        user,
      });
    } else {
      return res.status(201).send(user);
    }
  } catch (err) {
    return handleError(res, err);
  }
};

const allFireBaseUser = async (req, res, next) => {
  try {
    const listUsers = await admin.auth().listUsers();
    const users = listUsers.users.map(mapUser);
    return res.status(200).send(users);
  } catch (err) {
    return handleError(res, err);
  }
};

const getUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await admin.auth().getUser(id);
    return res.status(200).send(mapUser(user).role);
  } catch (err) {
    return handleError(res, err);
  }
};

const getUserByUId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await admin.auth().getUser(id);
    return res.status(200).send(mapUser(user));
  } catch (err) {
    return handleError(res, err);
  }
};

const getOneByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await admin.auth().getUserByEmail(email);
    return res.status(200).send(mapUser(user));
  } catch (err) {
    return handleError(res, err);
  }
};

const updateUserByUid = async (req, res) => {
  try {
    const id = req.params.id;
    const { nom, email, telephone, role } = req.body;

    if (!id || !nom || !telephone || !email || !role) {
      return res.status(400).send({ message: "Missing fields" });
    }
    await admin
      .auth()
      .updateUser(id, { displayName: nom, email, phoneNumber: telephone });
    await admin.auth().setCustomUserClaims(id, { role });
    const user = await admin.auth().getUser(id);
    return res.status(204).send({ user: mapUser(user) });
  } catch (err) {
    return handleError(res, err);
  }
};

const addUSerPhotoUrl = async (req, res) => {
  try {
    const id = req.params.id;
    const photoURL = process.env.HOST_URL + req.file.path;

    if (!photoURL) {
      return res.status(400).send({ message: "Missing file" });
    }
    console.log(encodeURI(photoURL.replace("\\", "/")));
    await admin
      .auth()
      .updateUser(id, { photoURL: encodeURI(photoURL.replace("\\", "/")) });
    return res.status(204).send({ photoURL: photoURL });
  } catch (err) {
    return handleError(res, err);
  }
};

const generateResetPasswordCode = async (req, res) => {
  try {
    const email = req.params.email;
    const link = await admin.auth().generatePasswordResetLink(email);
    const code = link.split("oobCode=")[1];
    return res.status(200).send({ link: link, code: code });
  } catch (err) {
    return handleError(res, err);
  }
};

const removeUser = async (req, res) => {
  try {
    const id = req.params.id;
    await admin.auth().deleteUser(id);
    return res.status(204).send();
  } catch (err) {
    return handleError(res, err);
  }
};

function mapUser(user) {
  const customClaims = user.customClaims || { role: "" };
  const role = customClaims.role ? customClaims.role : "";
  return {
    uid: user.uid,
    email: user.email || "",
    displayName: user.displayName || "",
    role,
    photoURL: user.photoURL,
    lastSignInTime: user.metadata.lastSignInTime,
    creationTime: user.metadata.creationTime,
  };
}

function handleError(res, err) {
  console.log(err);
  return res.status(500).send({
    message: `${err.code} - ${err.message}`,
  });
}

function ModelCoiffeuse(user) {}

module.exports = {
  allFireBaseUser,
  getUserByUId,
  createUser,
  getOneByEmail,
  updateUserByUid,
  generateResetPasswordCode,
  removeUser,
  addUSerPhotoUrl,
  getUserRole,
};
