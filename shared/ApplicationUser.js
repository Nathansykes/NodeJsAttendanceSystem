
class ApplicationUser {
    constructor(id, firstname, lastname, usertype) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.usertype = usertype;
    }
    Id() {
        return this.id;
    }
    FirstName() {
        return this.firstname;
    }
    LastName() {
        return this.lastname;
    }
    UserType() {
        return this.usertype;
    }
}

module.exports = ApplicationUser;