import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import {ViewChild} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent {
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) page : MatPaginator | null;

  constructor(private trainingService : TrainingService){
    this.page = null;
  }

  ngOnInit(){
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
    setTimeout(() => this.dataSource.paginator = this.page);
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  doFilter(filter: KeyboardEvent){
    const element = filter.currentTarget as HTMLInputElement;
    const value = element.value;
    if(filter){
      this.dataSource.filter = value.trim().toLowerCase();
    }
  }
}
