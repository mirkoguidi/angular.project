import {Component} from '@angular/core';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})

export class TrainingComponent {
  onGoingTraining = false;

  constructor(private trainingService: TrainingService){}

  ngOnInit(){
    this.trainingService.exerciseChanged.subscribe(ex => {
      if(ex.name === "null"){
        console.log(ex.name)
        this.onGoingTraining = false;
      } else {
        this.onGoingTraining = true;
      }
    })
  }

  ngOnDestroy(){

  }
}
