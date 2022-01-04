import { NotesDialogComponent } from './notes-dialog/notes-dialog.component';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { not } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'AngularTestSpaceStation';
  callLogInterval!: Subscription
  constructor(private service: AppService, public dialog: MatDialog ) { }

  data: any;
  logInterval = interval(2000);
  
  ngOnInit() {

    this.service.getLocations().subscribe(res => {
      this.data = res;
    });

    this.callLogInterval = this.logInterval.subscribe(() => {
      this.print();
    })
  }

  print(notes: string = "") {
    var time = new Date();

    const div = document.getElementById("consoleDiv");
    const p = document.createElement("p");
    if (notes != "" && notes != null) {
      notes = `. Notes: ${notes}`
    }
    p.textContent = `[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]  Longitude :${this.data.iss_position.longitude},  Longitude :${this.data.iss_position.latitude}${notes}`;
    div?.appendChild(p);

  }

  openDialog() {
    // this.callLogInterval.unsubscribe();
    const dialogRef = this.dialog.open(NotesDialogComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res.event = "Save") {
        this.print(res.notes);
        // this.callLogInterval = this.logInterval.subscribe(() => {
        //   this.print();
        // });
      }
    })
  }

}
