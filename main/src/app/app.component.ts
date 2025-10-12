import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './pages/budget/loader/loader.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LoaderComponent],
    templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'budget family';
}
