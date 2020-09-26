import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MyService } from './../services/my.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public messages: string[] = [];

  constructor(private _myService: MyService) {}

  ngOnInit(): void {
    this._myService
      .getServerSentEvent('/sse-resource')
      .pipe(map((data) => data['data']))
      .subscribe((data) => {
        console.log(data);
        this.messages = [...this.messages, JSON.parse(data).msg];
      });
  }
}
