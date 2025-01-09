import { AfterViewInit, ChangeDetectionStrategy, Component, inject, viewChild, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegisterData } from '../../../../interfaces';
import { AuthService } from '../../../../services';
import { Task } from '../../../../interfaces/task.interface';
import { TrelloListComponent } from '../trello-list/trello-list.component';
import { TaskTypeTypes } from '../../../../types/task-type.types';
import { TaskPriorityTypes } from '../../../../types/task-priority.types';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

const ELEMENT_DATA: UserRegisterData[] = [
  {email: '1@1', password: '11111', login: '1', isAuth: false},
  {email: '1@1', password: '11111', login: '2', isAuth: false},
  {email: '1@1', password: '11111', login: '3', isAuth: false}
]

@Component({
  selector: 'app-trello',
  templateUrl: './trello.component.html',
  styleUrl: './trello.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrelloComponent implements AfterViewInit {
  
  public form!: FormGroup
  public users!: UserRegisterData[];
  public types: TaskTypeTypes[] = ['task', 'bug', 'cr']
  public priority: TaskPriorityTypes[] = ['high', 'medium', 'low']
  public tasks: Task[] = []

  displayedColumns: string[] = ['email', 'password', 'login', 'isAuth']
  dataSource = new MatTableDataSource(ELEMENT_DATA)

  @ViewChild('trelloListComponent') private trelloListComponent!: TrelloListComponent
  @ViewChild(MatSort) sort?: MatSort
  @ViewChild(MatPaginator) paginator?: MatPaginator;

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
      worker: [null, [Validators.required]],
    })
  }

  public getErrorMessage(fieldName: string): string {
      const field: AbstractControl = this.form.controls[fieldName];
      const isRequired: boolean = field?.errors?.['required'];
      if (isRequired) return 'Field is required'
      return ''
    }

  private _liveAnnouncer = inject(LiveAnnouncer);

  public announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`)
    } else {
      this._liveAnnouncer.announce('Sorting removed')
    }
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
