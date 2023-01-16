import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';
import { GetAllStudentsResponse} from '../models/api-models/getallstudents-response.model';
import { UpdateStudentRequest } from '../models/api-models/updatestudentrequest.model'
import { AddStudentRequest } from '../models/api-models/add-student-request.model';

@Injectable({
  providedIn: 'root'
})
export class studentService {
  private baseApiUrl ='https://localhost:7017/';
  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]>
  {
    return this.httpClient.get<Student[]>(this.baseApiUrl  + 'api/students/GetAllStudents');
  }

  getStudentbyId(studentId: string): Observable<Student> {
    return this.httpClient.get<Student>(this.baseApiUrl  + 'api/students/GetStudentbyId/'+studentId);
  }

  updateStudent(studentId: string, studentRequest: Student): Observable<Student>
  {
    const updateStudentRequest: UpdateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      postalAddress: studentRequest.address.postalAddress,
      physicalAddress: studentRequest.address.physicalAddress
    }
    return this.httpClient.put<Student>(this.baseApiUrl+'api/students/UpdateStudent/'+studentId+'',
    updateStudentRequest);
  }

  deleteStudent(studentId: string) : Observable<Student>{
    return this.httpClient.delete<Student>(this.baseApiUrl+'api/students/DeleteStudent/'+studentId)
  }

  addStudent(studentRequest: Student): Observable<Student>
  {
    const addStudentRequest: AddStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      postalAddress: studentRequest.address.postalAddress,
      physicalAddress: studentRequest.address.physicalAddress
    }
    return this.httpClient.post<Student>(this.baseApiUrl+'api/students/AddStudent', addStudentRequest);
  }

  uploadImage(studentId: string, file: File): Observable<any> {
    const formData = new  FormData();
    formData.append("profileImage",file) //profileImage is the parametername as it is in the api
    return this.httpClient.post(this.baseApiUrl+'/students/'+ studentId+'/'+'upload-image',
    formData, {
      responseType: 'text'
    })
  }

  getImagePath(relativePath: string) {
    //return `${this.baseApiUrl}\${relativePath}`;
    return `${this.baseApiUrl}${relativePath}`;
  }
}
