import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Task } from '../../../../interfaces/task.interface';
import { TrelloList } from '../../../../interfaces/trello-list.interface';
import { AuthService } from '../../../../services';

@Component({
  selector: 'app-trello-list',
  templateUrl: './trello-list.component.html',
  styleUrl: './trello-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrelloListComponent {
  public tasks: Task[] = []
  public model: TrelloList = {
    assignedForMe: [],
    assignedFromMe: []
  }

  constructor(private authService: AuthService) {
    this.initTasks()
  }

  private initTasks(): void {
    const tasksLocalStorage: string = localStorage.getItem('tasks') || '[]'
    const tasks: Task[] = JSON.parse(tasksLocalStorage)
    const login: string | undefined = this.authService.activeUser?.login
    tasks.forEach((task: Task) => {
      if (task.worker === login) {
        this.model.assignedForMe.push(task)
      } else if (task.creator === login) {
        this.model.assignedFromMe.push(task)
      }
    })
  }
}
