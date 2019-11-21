import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import * as moment from 'moment';
import * as localForage from 'localforage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'precacher';

  images: string[] = [];
  random: Observable<string>;
  devices: Observable<{ devices: string[], updated: string }>;
  enabledDevices: boolean = false;

  constructor(private http: HttpClient) {
    for (let i = 1; i <= 17; i++) {
      this.images.push(`pic${i}.jpg`);
    }
  }

  getDevices(): Observable<{ devices: string[], updated: string }> {

    return new Observable(subscriber => {

      localForage.getItem('devices').then((cache: string) => {
        if (cache) {
          subscriber.next(JSON.parse(cache));
        }
      }).then(_ => {
        this.http.get<{ devices: string[] }>('http://www.mocky.io/v2/5dc47f293000003c00347bb3?mocky-delay=5000ms').pipe(
          switchMap(data => of({ ...data, updated:  this.now() })),
          tap(data => {
            localForage.setItem('devices', JSON.stringify(data));
            console.log('From network', data);
          })
        ).subscribe(data => subscriber.next(data) );
      });
    });
  }

  now(): string {
    return  moment().format('DD-MM-YYYY HH:mm:ss');
  }

  ngOnInit(): void {
    this.random =
      this.http.get<string>('https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new');
    this.devices = this.getDevices();
  }

}
