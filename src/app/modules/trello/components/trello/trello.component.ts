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

  @ViewChild('trelloListComponent') private trelloListComponent!: TrelloListComponent

  constructor(
    private authService: AuthService,
  ) {
    this.initForm()
    this.users = this.authService.getUsers()
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
    tasks.push(task)
    this.form.reset()

    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.trelloListComponent.reload$.next(null);
  }

  private initForm(): void {
    this.form = new FormGroup<any>({
      task: new FormControl(null, [Validators.required]),
      worker: new FormControl(null),
    })
  }
}
