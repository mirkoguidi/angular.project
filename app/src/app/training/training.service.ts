import { Exercise } from "./exercise.model";
import {Subject} from "rxjs";
export class TrainingService{
    private availableExercises: Exercise[] = [
        {id:'crunches', name: 'Crunches', duration: 30, calories: 8},
        {id:'touch-toes', name: 'Touch toes', duration: 150, calories: 20},
        {id:'side-lunges', name: 'Side lunges', duration: 40, calories: 39},
        {id:'burpees', name: 'Burpees', duration: 30, calories: 8},
    ];

    private runningExercise : Exercise;
    exerciseChanged = new Subject<Exercise>(); 
    private exercises: Exercise[] = [];

    constructor(){
        this.runningExercise = {id:'null', name: 'Crunches', duration: 30, calories: 8};
    }

    getAvaliableExercises(){
        return this.availableExercises.slice();
    }

    startExercise(selectedId : string){
        const ex = this.availableExercises.find(exc => exc.id === selectedId);
        if(ex){
            this.runningExercise = ex;
            this.exerciseChanged.next({...this.runningExercise});
        }
    }

    getRunningExercise(){
        return{...this.runningExercise};
    }

    completeExercise(){
        this.exercises.push({...this.runningExercise, date: new Date(), state: 'completed'});
        console.log(this.exercises);
        this.runningExercise = this.runningExercise = {id:'null', name: 'null', duration: 0, calories: 0};
        this.exerciseChanged.next(this.runningExercise);
    }

    cancelExercise(progress: number){
        this.exercises.push({...this.runningExercise, duration: this.runningExercise.duration * (progress / 100), calories: this.runningExercise.calories * (progress / 100), date: new Date(), state: 'cancelled'});
        console.log(this.exercises);
        this.runningExercise = this.runningExercise = {id:'null', name: 'null', duration: 0, calories: 0};
        this.exerciseChanged.next(this.runningExercise);
    }

    getCompletedOrCancelledExercises(){
        return this.exercises.slice();
    }
}