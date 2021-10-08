import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http: HttpClient) { }

  translate(source: string = "", destination: string = "", text: string): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        "content-type": "application/x-www-form-urlencoded",
        "accept-encoding": "application/gzip",
        "x-rapidapi-key": "0b63256737mshd4164fe1489a7dfp1f71c1jsn591d2b3eadd2",
        "x-rapidapi-host": "google-translate1.p.rapidapi.com"
      })
    };
    let body = new URLSearchParams({
      "source": source,
      "target": destination,
      "q": text,
    });
    return this.http.post("https://google-translate1.p.rapidapi.com/language/translate/v2", body.toString(), options);
  }
}
