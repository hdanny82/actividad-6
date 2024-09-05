import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/service.service';
import { IUser } from '../../interfaces/iuser.interface';
import { UserCardComponent } from '../../components/user-card/usercard.component';
import { IData } from '../../interfaces/idata.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent,FormsModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  usersServices = inject (UsersService)
  arrUsers : IUser [] = []
  page : number = 1
  totalPages : number = 1

  // 
  // 
  ngOnInit () {
    this.usersServices.getAll(this.page).subscribe((data: IData) => {
      this.arrUsers = data.results
      this.page = data.page
      this.totalPages = data.total_pages
    } )
  }
  changePage ($event : any) {
    this.page = ($event.target.value === "next") ? this.page + 1 : this.page - 1
    this.usersServices.getAll(this.page).subscribe((data: IData) => {
      this.arrUsers = data.results
    } )
  }

}

