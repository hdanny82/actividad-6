import { Injectable, inject } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { IData } from '../interfaces/idata.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpClient = inject(HttpClient)
  private url = 'https://peticiones.online/api/users'
  
  getAll(page : number): Observable <IData> {
    return this.httpClient.get<IData>(`${this.url}?page=${page}`)
  }
  getById (_id : string): Observable <IUser> {
    return this.httpClient.get<IUser>(`${this.url}/${_id}`)
  }

  deleteUser (_id: string) : Observable <IUser> {
    return this.httpClient.delete<IUser> (`${this.url}/${_id}`)
  }

  createNewUser (formValue: IUser) : Observable <IUser> {
    return this.httpClient.post <IUser> (`${this.url}`,formValue)
  }

  updateUser (formValue: IUser) : Observable <IUser> {
    return this.httpClient.put <IUser> (`${this.url}/${formValue._id}`,formValue)
  }

}
