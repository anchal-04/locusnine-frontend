import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  apiUrl = "http://localhost:8080/users";

  editUser = false;

  user = {
    userId: '',
    userName: '',
    userEmail: '',
    userRole: '',
    userStatus: ''
  }

  update(newUser: any) {
    this.user.userId = newUser.userId;
    this.user.userName = newUser.userName;
    this.user.userEmail = newUser.userEmail;
    this.user.userRole = newUser.userRole;
    this.user.userStatus = newUser.userStatus;
  }

  clear() {
    this.user.userId = ''
    this.user.userName = ''
    this.user.userEmail = ''
    this.user.userRole = ''
    this.user.userStatus = ''
  }

  getData() {
    return this.http.get(this.apiUrl);
  }

  postData(userData: Object) {
    console.log(userData);
    return this.http.post(this.apiUrl, userData);
  }

  putData(userData: Object) {
    console.log(userData);
    return this.http.put(this.apiUrl, userData);
  }

  deleteData(userId: string) {
    return this.http.delete(this.apiUrl + '?id=' + userId);
  }

}
