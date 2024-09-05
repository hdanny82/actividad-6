import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/service.service';
import { IUser } from '../../interfaces/iuser.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonsComponent } from '../../components/buttons/buttons.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, ButtonsComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  activatedRoute = inject (ActivatedRoute)
  userServices = inject (UsersService)
  currentUser !: IUser 
  error : boolean = false

  ngOnInit ( ) : void {
    this.activatedRoute.params.subscribe ( (params:any) => {
      let currentId = params.url
      this.userServices.getById(currentId).subscribe((data:any) => {
        if (data.error !== undefined) {
          this.error = true
        } else {
          this.error = false
          this.currentUser = data
        }
      })
    })
  }
}
