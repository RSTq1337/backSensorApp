import {Component, NgIterable, OnInit} from '@angular/core';
import { SensorService } from '../sensor.service';
import { Sensor } from '../sensor';
import { Observable, Subject } from "rxjs";

import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.css']
})
export class SensorListComponent implements OnInit {

 constructor(private sensorservice: SensorService) { }

  sensorsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  sensors: Sensor[];
  sensor: Sensor = new Sensor();
  deleteMessage = false;
  sensorlist: any;
  isupdated = false;


  ngOnInit() {
    this.isupdated = false;
    this.dtOptions = {
      pageLength: 10,
      stateSave: true,
      lengthMenu: [[6, 16, 20, -1], [6, 16, 20, 'All' ]],
      processing: true
    };
    this.sensorservice.getSensorList().subscribe(data =>{
    this.sensors = data;
    this.dtTrigger.next();
    })
  }

  deleteSensor(id: number) {
    this.sensorservice.deleteSensor(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage = true;
          this.sensorservice.getSensorList().subscribe(data => {
            this.sensors = data
            })
        },
        error => console.log(error));
  }


  updateSensor(id: number){
    this.sensorservice.getSensor(id)
      .subscribe(
        data => {
          this.sensorlist = data
        },
        error => console.log(error));
  }

  sensorupdateform = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    description: new FormControl()
  });

  updateSnsr(updsnsr){     // Доделать поля
    this.sensor = new Sensor();
   this.sensor.id = this.SensorId.value;
   this.sensor.name = this.SensorName.value;
   this.sensor.description = this.SensorDescription.value;

   this.sensorservice.updateSensor(this.sensor.id, this.sensor).subscribe(
    data => {
      this.isupdated = true;
      this.sensorservice.getSensorList().subscribe(data =>{
        this.sensors = data
        })
    },
    error => console.log(error));
  }

  get SensorName(){
    return this.sensorupdateform.get('name');
  }

  get SensorDescription(){
    return this.sensorupdateform.get('description');
  }


  get SensorId(){
    return this.sensorupdateform.get('id');
  }

  changeisUpdate(){
    this.isupdated = false;
  }
}
