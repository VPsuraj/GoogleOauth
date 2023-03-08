import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthResponseData } from '../appInterface/app-inetrface';
import { user } from '../appmodel/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject<user>();

  constructor(private http:HttpClient) { }

  singup(email: any, password: any){
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDG4QnNZZFzuS442aGn9meNbrbDrSvGxeA',{
      email:email,
      password:password,
      returnSecureToken:true
    })
  }

  signin(email: any, password: any){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDG4QnNZZFzuS442aGn9meNbrbDrSvGxeA',{
      email:email,
      password:password,
      returnSecureToken:true
    })
  }

  private authnticationUser(email: any,userId: any,token: any,expiresIn: any,) {
    const experationDate = new Date(new Date().getTime()+expiresIn*1000);
    const User = new user(email,userId,expiresIn,token);
    this.user.next(User);
  }

  googlesignin(IdToken: any){
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDG4QnNZZFzuS442aGn9meNbrbDrSvGxeA',{
      postBody:`id_token=${IdToken}&providerId=google.com`,
      requestUri:"http://localhost:4200",
      returnIdpCredential:true,
      returnSecureToken:true
    })
  }
}


//google client id 
// 402057316490-qookr1brglhmp9hhvqivl9da6osmbk10.apps.googleusercontent.com
