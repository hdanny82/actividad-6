import { Component, Input, inject } from '@angular/core';
import { UsersService } from '../../services/service.service';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {

  @Input () currentUserId: string | any

  usersServices = inject(UsersService)
  error !: boolean 
   deleteUser (currentUserId: string) {
    this.usersServices.deleteUser(currentUserId).subscribe((response:any) => {
      if (response._id){
        this.error = false
        alert("Usuario borrado correctamente")
        console.log(response)
      } else {
        this.error = true
        alert ("ATENCIÓN: se ha verificado un error.\nNo hemos podido borrar el usuario")
        console.log (this.error)
      }
    })
  }
}

