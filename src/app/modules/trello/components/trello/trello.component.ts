import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegisterData } from '../../../../interfaces';
import { AuthService } from '../../../../services';
import { Task } from '../../../../interfaces/task.interface';

@Component({
  selector: 'app-trello',
  templateUrl: './trello.component.html',
  styleUrl: './trello.component.scss',
  
})
export class TrelloComponent {
  public form!: FormGroup
  public users!: UserRegisterData[];

  constructor(
    private authService: AuthService
  ) {
    this.initForm()
    this.users = this.authService.getUsers()
  }

  public submit(): void {
    const task: Task = {
      task: this.form.value.task,
      worker: this.form.value.worker,
    }
    const tasks: Task[] = !!localStorage.getItem('tasks') 
    ? JSON.parse(localStorage.getItem('tasks') || '')
    : [];
      tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  private initForm(): void {
    this.form = new FormGroup<any>({
      task: new FormControl(null, [Validators.required]),
      worker: new FormControl(null)
    })
  }
}
