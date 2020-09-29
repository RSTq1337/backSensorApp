import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SensorService {

  private baseUrl = 'http://localhost:8089/api/';

  constructor(private http: HttpClient) { }

  getSensorList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + 'sensor-list');
  }

  createSensor(sensor: object): Observable<object> {
    return this.http.post(`${this.baseUrl}` + 'save-sensor', sensor);
  }

  deleteSensor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-sensor/${id}`, { responseType: 'text' });
  }

  getSensor(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/sensor/${id}`);
  }

  updateSensor(id: number, value: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/update-sensor/${id}`, value);
  }

}
