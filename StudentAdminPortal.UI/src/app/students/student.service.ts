import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';
import { GetAllStudentsResponse} from '../models/api-models/getallstudents-response.model';
import { UpdateStudentRequest } from '../models/api-models/updatestudentrequest.model'

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
}
