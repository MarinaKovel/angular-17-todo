import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  // tiles = [
  //   {content: 'Search task', cols: 3, rows: 1},
  //   {content: 'Logo', cols: 1, rows: 2},
  //   {content: 'About us', cols: 1, rows: 1},
  //   {content: 'Social networks', cols: 1, rows: 1},
  //   {content: 'Contact manager', cols: 2, rows: 1}
  // ] // in this case use content projection

  public search!: FormGroup

  constructor() {
    this.initForm()
  }

  public submit(): void {
    console.log(this.search.value);
  }

  private initForm(): void {
    this.search = new FormGroup<any>({
      search: new FormControl(null),
    })
  }
}
