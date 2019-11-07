import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'precacher';

  images: string[] = [];
  random: Observable<string>;

  constructor(private http: HttpClient) {
    for (let i = 1; i <= 17; i++ ) {
      this.images.push(`pic${i}.jpg`);
    }
  }

  ngOnInit(): void {
    this.random =
      this.http.get<string>('https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new');
  }

}
