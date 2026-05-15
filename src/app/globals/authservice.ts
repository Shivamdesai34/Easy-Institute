import {Injectable} from '@angular/core';

@Injectable()
export class AuthService{

    constructor() { }

    getAuthToken():string {
      const userToken = sessionStorage.getItem('token');

      return userToken !== null ? userToken : ''
    }

}
