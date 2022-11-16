import http from "../http/http-form-encoded";

class UserDataService {

    getAll(userType) {
        return http.get("/users", { params : {UserType : userType}});
    }

    get(id) {
        return http.get(`/users/id=${id}`)
    }

    create(data) {
        return http.post("/users", data);
    }

    update(id, data) {
        return http.put(`/users/${id}`, data);
    }

    delete(id) {
        return http.delete(`/users/${id}`);
    }

    findByName(userType, firstName, lastName) {
        return http.get("/users", {params : { UserType: userType, firstname : firstName, lastname : lastName}});
    }
    findByType(userType){
        return http.get("/users", {params : {UserType: userType}})
    }  
}

export default new UserDataService();