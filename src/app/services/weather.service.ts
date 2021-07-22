import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Weather } from '../model/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor( private http:HttpClient ) { }

  // Method to get the weather info data of a "city" from operweather api
  getWeather( city:string ): Observable<Weather> {
    
    const options = new HttpParams()
      .set('units', 'metric')
      .set('q', city)
      .set('appId', environment.apiKey);

      return this.http.get<Weather>(environment.apiUrl + 'weather', { params: options });
  }

}
