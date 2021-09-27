import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http: HttpClient) { }

  translate_v1(source: string, destination: string, text: string): Observable<any> {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let body = new URLSearchParams();
    body.set('sl', source);
    body.set('tl', destination);
    body.set('q', text);
    let api_key = "?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&ie=UTF-8&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e";
    return this.http.post(environment.apiGoogleTranslationUrl + api_key, body.toString(), options);
  }

  translate_v2(source: string, destination: string, text: string): Observable<any> {
    const optionRequest = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      })
    };
    return this.http.get(environment.apiGoogleTranslationUrl + "?client=gtx&sl=" + source + "&tl=" + destination + "&dt=t&q=" + text + "&ie+UTF-8&oe=UTF-8", optionRequest);
  }
}
