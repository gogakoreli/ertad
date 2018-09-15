import { Component } from '@angular/core';
import { RealtimeService } from './api/realtime.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "front";
  constructor(private realtime: RealtimeService) {}
}
