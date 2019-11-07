import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'precacher';

  images: string[] = [];
  random: Observable<string>;
  devices: Observable<{ devices: string[] }>;

  constructor(private http: HttpClient) {
    for (let i = 1; i <= 17; i++) {
      this.images.push(`pic${i}.jpg`);
    }
  }

  getDevices(): Observable<{ devices: string[] }> {
    return new Observable<{devices: string[]}>(subscriber => {
      if (localStorage.getItem('devices')) {
        subscriber.next(JSON.parse(localStorage.getItem('devices')));
      }
      this.http.get<{ devices: string[] }>('http://www.mocky.io/v2/5dc47f293000003c00347bb3?mocky-delay=5000ms').pipe(
        tap(d => {
          localStorage.setItem('devices', JSON.stringify(d));
          console.log('From network', d);
        })
      ).subscribe(devices => subscriber.next(devices));
    });
  }

  ngOnInit(): void {
    this.random =
      this.http.get<string>('https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new');
    this.devices = this.getDevices();
  }

}
