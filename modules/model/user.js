class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.token = "";
        this.baseURL = "http://localhost:7204/";
    }
    getID() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getToken() {
        return this.token;
    }

    setToken(token) {
        this.token = token;
    }

    getBaseURL() {
        return this.baseURL;
    }
}

export default User;