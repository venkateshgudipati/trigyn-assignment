import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: "root"
})
export class FriendService {

    constructor(private http: HttpClient) {

    }

    getUsers() {
        return this.http.get('/users');
    }

    saveUser(model){
        return this.http.post('/users',model);
    }

    deleteUser(userId){
        return this.http.delete(`/users/${userId}`);
    }
}