import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(private router: Router) {}

  goToFirstPage() {
    //
    this.router.navigate(['/home'], { queryParams: { page: 1 } }).then(() => {
      
      window.location.reload();
    });
  }
}

