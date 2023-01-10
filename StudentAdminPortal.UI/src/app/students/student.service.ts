import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';
import { GetAllStudentsResponse} from '../models/api-models/getallstudents-response.model';


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
}
