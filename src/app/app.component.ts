import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'precacher';

  images: string[] = [];

  constructor() {
    for (let i = 1; i <= 17; i++ ) {
      this.images.push(`pic${i}.jpg`);
    }
  }

}
