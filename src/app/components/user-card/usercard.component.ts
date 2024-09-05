import { Component, Input} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { ButtonsComponent } from '../buttons/buttons.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink, ButtonsComponent,DeleteModalComponent],
  templateUrl: './usercard.component.html',
  styleUrl: './usercard.component.css'
})
export class UserCardComponent {
  @Input () currentUser : IUser | any


}
