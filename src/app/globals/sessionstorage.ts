import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class SessionService {

  // private sessionSubject = new BehaviorSubject<any>(this.loadSession());

  private sessionSubject = new BehaviorSubject<any>(this.loadSession());
  session$ = this.sessionSubject.asObservable();


  constructor() {
  }

  private loadSession() {
    // const data = sessionStorage.getItem('session');
    // return data ? JSON.parse(data) : null;

  }

  public SaveData(key: string, value: string) {
    if (key.length <= 0) {
      return
    }
    if (value.length <= 0) {
      return
    }
    sessionStorage.setItem(key, value);
  }

  // public SaveData(key: string, value: string) {
  //   if (!key || key.length <= 0) {
  //     return;
  //   }
  //
  //   if (!value || value.length <= 0) {
  //     return;
  //   }
  //
  //   sessionStorage.setItem(key, value);
  // }

  public GetData(key: string) {
    if (key.length <= 0) {
      return ""
    }
    let sValue = ""
    sValue = sessionStorage.getItem(key)!;
    if (sValue == null) {
      sValue = ""
    }
    return sValue
  }

  public removeData(key: string) {
    if (key.length <= 0) {
      return
    }
    sessionStorage.removeItem(key);
  }

  public clearData() {
    sessionStorage.clear();
  }


}
