import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { studentService } from '../student.service';
import { NgForm } from '@angular/forms';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: ''
    }
  };
  isNewStudent = false;
  header = '';
  displayProfileImageUrl = 'NA';

  genderList: Gender[] = [];

  //@ViewChild('studentDetailsForm') studentDetailsForm?: NgForm;

  constructor(private readonly StudentService: studentService,
      private readonly route: ActivatedRoute,
      private readonly genderService: GenderService,
      private snackbar : MatSnackBar,
      private router: Router
      ){}
 ngOnInit(): void {
  this.route.paramMap.subscribe(
    (params) => {
      this.studentId = params.get('id');

      if (this.studentId) {
        //if the router contains 'Add'
        //new student functionality
        if(this.studentId.toLowerCase()==='Add'.toLocaleLowerCase()){
            this.isNewStudent = true;
            this.header  ='Add New Student';
            this.setImage();
        }else {
          this.isNewStudent = false;
          this.header = 'Edit Student';

        this.StudentService.getStudentbyId(this.studentId)
        .subscribe(
          (successResponse) => {
            this.student = successResponse;
            this.setImage();
          },
          (errorResponse) => {
            this.setImage();
          }
        );
        }



        this.genderService.getGenderList().subscribe(
          (successResponse) => {
            this.genderList = successResponse;
            console.log(successResponse)
          }
        );
      }
    }
  );
 }
 onUpdate(): void {
     this.StudentService.updateStudent(this.student.id, this.student).subscribe(
      (successResponse) => {
        console.log(successResponse);
        this.snackbar.open('Student Updated Successfully', undefined,
            {duration: 2000})

      },
      (errorResponse) => {
        console.log(errorResponse);
        //log it
      }
     );
 }

 onDelete(): void {
    this.StudentService.deleteStudent(this.student.id)
    .subscribe(
      (successResponse) => {
        console.log(successResponse);
         this.snackbar.open('Student Deleted Successfully', undefined,
            {duration: 2000});
          setTimeout(
            ()=>{
               this.router.navigateByUrl('students');
            }, 2000);
      },
      (errorResponse) => {
        console.log(errorResponse);
        //log it
      }
    );
 }

 onAdd():void {
  this.StudentService.addStudent(this.student)
  .subscribe(
    (successResponse) => {
      console.log(successResponse);
      this.snackbar.open('Student Added Successfully', undefined,
          {duration: 2000});
          setTimeout(
            ()=>{
              // this.router.navigateByUrl('students');
              //this.router.navigateByUrl(`students/${successResponse.id}`);
              this.router.navigateByUrl('students');
            }, 2000);
    },
    (errorResponse) => {
      console.log(errorResponse);
      //log it
    }
  );
 }

 uploadImage(event:any): void{
    if(this.studentId)
    {
     const file : File = event.target.Files[0];
     this.StudentService.uploadImage(this.student.id, file)
     .subscribe(
      (successResponse) =>{
          this.student.profileImageUrl = successResponse;
          this.setImage();
          this.snackbar.open('Profile Image Updated', undefined,{
            duration:2000
          })
      }

     )
    }
 }

 private setImage() : void  {

  if(this.student.profileImageUrl === 'NA')
  {
    //display a default
    this.displayProfileImageUrl= '/assets/user.jpeg';
    console.log()
    console.log(this.displayProfileImageUrl);
  }
  else
  {
      //fetch image by url
      console.log(this.student.profileImageUrl);
      this.displayProfileImageUrl=this.StudentService.getImagePath(
        this.student.profileImageUrl);
    }
  }
}
