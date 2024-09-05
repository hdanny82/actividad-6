import { Component, Input} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [RouterLink,DeleteModalComponent],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  @Input() parent : string | any
  @Input () currentUserId : string | any

}
