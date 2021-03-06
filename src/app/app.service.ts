import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getLocations(): Observable<Object> {
    return this.http.get<Object>("http://api.open-notify.org/iss-now.json");
  }
}
