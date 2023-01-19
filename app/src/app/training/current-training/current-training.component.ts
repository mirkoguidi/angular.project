import { Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent {
   progress = 0;
   time : number = 0;

   constructor(public snackbar: MatSnackBar,private dialog: MatDialog, private trainingService: TrainingService, private router: Router){

   }

  ngOnInit(){
    this.startOrResumeTimer();
    this.trainingService.exerciseChanged.subscribe(ex => {
      if(ex.id==="null"){
        this.router.navigate(['/training']);
      }
    });
  }

  startOrResumeTimer(){
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.time = setInterval(()=>{
      this.progress = this.progress+1;
      if(this.progress >= 100){
        this.trainingService.completeExercise();
        clearInterval(this.time);
      }
    }, step);
  }

  onStop(){
    clearInterval(this.time);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.trainingService.cancelExercise(this.progress);
        this.snackbar.open('Exercise cancelled!', 'ok', {
          duration: 3000
        });
      } else {
        this.startOrResumeTimer();
      }
    });
  }

}
