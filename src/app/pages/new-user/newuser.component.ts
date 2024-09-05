import { Component } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']  
})
export class NewUserComponent {

}
