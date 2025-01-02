import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserRegisterData } from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from './services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterOutlet, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
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
    this.authService.isAuth$.next(false);
  }
}
