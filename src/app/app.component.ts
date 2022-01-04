import { NotesDialogComponent } from './notes-dialog/notes-dialog.component';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { not } from '@angular/compiler/src/output/output_ast';
import { Time } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'AngularTestSpaceStation';
  callLogInterval!: Subscription
  constructor(private service: AppService, public dialog: MatDialog) { }

  data: any;
  time = new Date();
  logInterval = interval(2000);

  ngOnInit() {

    this.service.getLocations().subscribe(res => {
      this.data = res;
    });

    this.callLogInterval = this.logInterval.subscribe(() => {
      this.service.getLocations().subscribe(res => {
        this.data = res;
      });
      this.print();
    })
  }

  print(notes: string = "", dialogLocation?: any, dialogTime?: Date) {
    this.data = dialogLocation ? dialogLocation : this.data;
    this.time = dialogTime ? dialogTime : new Date();

    const div = document.getElementById("consoleDiv");
    const p = document.createElement("p");
    if (notes != "" && notes != null) {
      notes = `. Notes: ${notes}`
    }
    else{
      notes = "";
    }
    p.textContent = `[${this.time.getHours()}:${this.time.getMinutes()}:${this.time.getSeconds()}]  Longitude :${this.data.iss_position.longitude},  Latitude :${this.data.iss_position.latitude}${notes}`;
    div?.appendChild(p);

  }

  openDialog() {
    // this.callLogInterval.unsubscribe();
    let dialogLocation = this.data;
    let dialogTime = this.time;
    const dialogRef = this.dialog.open(NotesDialogComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res.event = "Save") {
        this.print(res.notes, dialogLocation, dialogTime);
        // this.callLogInterval = this.logInterval.subscribe(() => {
        //   this.print();
        // });
      }
    })
  }

}
