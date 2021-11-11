class Utilisateur {

    constructor(uid, email, displayName, phoneNumber, role)  {
        this.uid = uid;
        this.email = email;
        this.displayName = displayName;
        this.phoneNumber = phoneNumber;
        this.role = role;
    }
}

module.exports = Utilisateur;