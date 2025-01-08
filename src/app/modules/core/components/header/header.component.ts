import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services';
import { UserRegisterData } from '../../../../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    private router: Router,
    public authService: AuthService
  ) {
  }

  public logout(): void {
    const users: UserRegisterData[] = this.authService.getUsers();
    users.map((user: UserRegisterData) => {
      if (user.login === this.authService.activeUser?.login) {
        user.isAuth = false;
      }
    })
    localStorage.setItem('users', JSON.stringify(users))

    this.router.navigateByUrl('/auth/login');
    this.authService.activeUser = null;
    this.authService.isAuth$.next(false);
  }
}
