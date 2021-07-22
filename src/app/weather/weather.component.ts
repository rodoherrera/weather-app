import { Component, OnInit } from '@angular/core';
import { Weather } from '../model/weather';
import { WeatherService } from '../services/weather.service';



@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weather: Weather | undefined; 
  
  constructor( private weatherService:WeatherService ) { }

  ngOnInit(): void {
  }

  // method that subscribe to the getWeather() of WeatherService and assign the result to the wather component property
  search( city:string ){
    this.weatherService.getWeather( city ).subscribe( weather => this.weather = weather );
  }

}
