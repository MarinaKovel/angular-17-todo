import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegisterData } from '../../../../interfaces';
import { AuthService } from '../../../../services';
import { Task } from '../../../../interfaces/task.interface';
import { TrelloListComponent } from '../trello-list/trello-list.component';
import { TaskTypeTypes } from '../../../../types/task-type.types';
import { TaskPriorityTypes } from '../../../../types/task-priority.types';

@Component({
  selector: 'app-trello',
  templateUrl: './trello.component.html',
  styleUrl: './trello.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrelloComponent {
  
  public form!: FormGroup
  public users!: UserRegisterData[];
  public types: TaskTypeTypes[] = ['task', 'bug', 'cr']
  public priority: TaskPriorityTypes[] = ['high', 'medium', 'low']
  public tasks: Task[] = []

  @ViewChild('trelloListComponent') private trelloListComponent!: TrelloListComponent

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.initForm()
    this.users = this.authService.getUsers().filter((user: UserRegisterData) => user.login !== 'Admin') // TODO add roles
    this.tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks') || '') : []
  }

  public submit(): void {
    const task: Task = {
      task: this.form.value.task,
      type: this.form.value.type,
      priority: this.form.value.priority,
      worker: this.form.value.worker,
      creator: this.authService.activeUser?.login || '',
      date: new Date(),
      isDone: false
    }

    this.tasks.push(task)
    this.form.reset()

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.trelloListComponent.reload$.next(null);
  }

  private initForm(): void {
    this.form = this.fb.group({
      task: [null, [Validators.required]],
      type: [this.types[0]],
      priority: [this.priority[1]],
      worker: [null],
    })
  }
}
