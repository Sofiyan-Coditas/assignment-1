import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'autoHaven';
  theme: Observable<string>;
  constructor(private store: Store<{theme: string}>) {
    this.theme = this.store.pipe(select('theme'));
  }
}
