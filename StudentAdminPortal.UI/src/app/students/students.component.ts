import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { studentService } from './student.service';
import { Student } from '../models/ui-models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit  {
  students: Student[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile',
  'gender'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = '';

  constructor(private studentService: studentService) { }
ngOnInit(): void{
  //Fetch Students
  this.filterString ='';
  this.studentService.getStudents()
  .subscribe(
    (successResponse) =>{
      this.students = successResponse;
      this.dataSource = new MatTableDataSource<Student>(this.students);
      console.log(successResponse);
      console.log(successResponse[0].firstName);
   /*   console.log(successResponse[1].firstName);
        console.log(this.dataSource.data[0].firstName);
        console.log(this.dataSource.data[0].dateOfBirth);
        console.log(this.dataSource.data[0].gender.description);
        console.log(this.dataSource.data[1].firstName);
        console.log(this.dataSource.data[1].dateOfBirth);
        console.log(this.dataSource.data[1].gender.description);*/
       if (this.matPaginator) {
        this.dataSource.paginator = this.matPaginator;
       }
       if (this.matSort) {
        this.dataSource.sort = this.matSort;
       }
    },
    (HttpErrorResponse) => {
      console.log(HttpErrorResponse);
    }
  );
}

filterStudents(){
  this.dataSource.filter = this.filterString.trim().toLowerCase();
}
}
