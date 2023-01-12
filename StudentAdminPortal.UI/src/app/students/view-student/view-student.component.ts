import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { studentService } from '../student.service';
import { NgForm } from '@angular/forms';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { MatSnackBar } from '@angular/material/snack-bar';



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
  displayProfileImageUrl = '';

  genderList: Gender[] = [];

  //@ViewChild('studentDetailsForm') studentDetailsForm?: NgForm;

  constructor(private readonly StudentService: studentService,
      private readonly route: ActivatedRoute,
      private readonly genderService: GenderService,
      private snackbar : MatSnackBar
      ){}
 ngOnInit(): void {
  this.route.paramMap.subscribe(
    (params) => {
      this.studentId = params.get('id');

      if (this.studentId) {
        this.StudentService.getStudentbyId(this.studentId)
        .subscribe(
          (successResponse) => {
            this.student = successResponse;

            console.log(successResponse);
          }
        );

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
        console.log('its passing here');
        this.snackbar.open('Student Updated Successfully', undefined,
            {duration: 2000})

      },
      (errorResponse) => {
        console.log(errorResponse);
        //log it
      }
     );
 }
}
