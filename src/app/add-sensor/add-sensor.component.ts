import { Component, OnInit } from '@angular/core';
import { SensorService } from '../sensor.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Sensor } from '../sensor';
@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.css']
})
export class AddSensorComponent implements OnInit {

  constructor(private sensorservice: SensorService) { }

  sensor: Sensor = new Sensor();
  submitted = false;

  ngOnInit() {
    this.submitted = false;
  }

  sensorsaveform = new FormGroup({
    name: new FormControl('' , [Validators.required , Validators.minLength(5) ] ),
    description: new FormControl('',[Validators.required, Validators.minLength(5)])
  });

  saveSensor(saveSensor){
    this.sensor = new Sensor();
    this.sensor.name = this.SensorName.value;
    this.sensor.description = this.SensorDescription.value;
    this.submitted = true;
    this.save();
  }



  save() {
    this.sensorservice.createSensor(this.sensor)
      .subscribe(data => console.log(data), error => console.log(error));
    this.sensor = new Sensor();
  }

  get SensorName(){
    return this.sensorsaveform.get('name');
  }

  get SensorModel(){
    return this.sensorsaveform.get('model');
  }

  get SensorType(){
    return this.sensorsaveform.get('type');
  }

  get SensorUnit(){
    return this.sensorsaveform.get('unit');
  }

  get SensorDescription(){
    return this.sensorsaveform.get('description');
  }

  addSensorForm(){
    this.submitted = false;
    this.sensorsaveform.reset();
  }
}
