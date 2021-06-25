import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../model/Environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public environmentUrl: any

  constructor(private http: HttpClient, private environment: Environment) {
    this.http.get(window.location.origin+"/heroku-env").subscribe(f=> {
      localStorage.setItem("key",f as string)
      this.environment.config = f
    })

   }
}
