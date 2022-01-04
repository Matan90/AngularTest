import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notes-dialog',
  templateUrl: './notes-dialog.component.html',
  styleUrls: ['./notes-dialog.component.scss']
})
export class NotesDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NotesDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  ngOnInit(): void { }

  save() {
    this.dialogRef.close({ event: "Save", notes: this.data });
  }

  cancel() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
