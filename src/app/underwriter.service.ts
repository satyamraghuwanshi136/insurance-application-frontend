import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UnderwriterService {

  constructor(private http: HttpClient) { }

  getUnderwriters(){
    return this.http.get<User[]>('/user/all-user');
  }

  getUnderwriterById(id: number){
    return this.http.get<User>('/user/' + id);
  }

  addUndereriter(userData: User){
    return this.http.post<User>('/user', userData);
  }

  updateUnderwriter(id: number, user: User): Observable<User> {
    return this.http.put<User>('/user/' + id, user);
  }

  deleteUndereriterById(id: number){
    return this.http.delete('/user/' + id);
  }
}
