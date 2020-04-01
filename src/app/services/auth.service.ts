import { UsuarioModel } from 'src/app/models/usuario.models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private apiKey = 'AIzaSyC0UKCx2qn9dUeZE1MvHu9REz2dWtL27Xc';

  userToken: string;

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logout() {}

  login(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}:signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map(resp => {
        this.guardarToken(resp.idToken);
        return resp;
      })
    );;
  }

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}:signUp?key=${this.apiKey}`,
      authData
    ).pipe(
      map(resp => {
        this.guardarToken(resp.idToken);
        return resp;
      })
    );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

}
