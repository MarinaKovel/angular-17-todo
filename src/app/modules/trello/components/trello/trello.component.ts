import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegisterData } from '../../../../interfaces';
import { AuthService } from '../../../../services';
import { Task } from '../../../../interfaces/task.interface';
import { TrelloListComponent } from '../trello-list/trello-list.component';

@Component({
  selector: 'app-trello',
  templateUrl: './trello.component.html',
  styleUrl: './trello.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrelloComponent {
  
  public form!: FormGroup
  public users!: UserRegisterData[];
  public tasks: Task[] = []

  @ViewChild('trelloListComponent') private trelloListComponent!: TrelloListComponent

  constructor(
    public authService: AuthService,
  ) {
    this.initForm()
    this.users = this.authService.getUsers().filter((user: UserRegisterData) => user.login !== 'Admin') // TODO add roles
    this.tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks') || '') : []
  }

  public submit(): void {
    const task: Task = {
      task: this.form.value.task,
      worker: this.form.value.worker,
      creator: this.authService.activeUser?.login || ''
    }
    const tasks: Task[] = !!localStorage.getItem('tasks') 
    ? JSON.parse(localStorage.getItem('tasks') || '')
    : [];
    this.tasks.push(task)
    this.form.reset()

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.trelloListComponent.reload$.next(null);
  }

  private initForm(): void {
    this.form = new FormGroup<any>({
      task: new FormControl(null, [Validators.required]),
      worker: new FormControl(null),
    })
  }
}
