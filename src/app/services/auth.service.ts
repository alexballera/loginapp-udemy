import { UsuarioModel } from 'src/app/models/usuario.models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private apiKey = 'AIzaSyC0UKCx2qn9dUeZE1MvHu9REz2dWtL27Xc';
  // Crear Nuevo Usuario
  // signUp?key=[API_KEY]

  // LogIn
  // signInWithPassword?key=[API_KEY]


  constructor(private http: HttpClient) {}

  logout() {}

  login(usuario: UsuarioModel) {}

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    }

    return this.http.post(
      `${this.url}:signUp?key=${this.apiKey}`,
      authData
    )
  }

}
