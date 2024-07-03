import { Component, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  template: `
    <h2 mat-dialog-title>{{data.title}}</h2>
    <mat-dialog-content>
      {{data.content}}
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="confirm()">Procedi</button>
      <button mat-button color="danger" (click)="decline()">Annulla</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDialogComponent {
    dialogRef = inject(MatDialogRef);

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    confirm() {
        this.dialogRef.close(true);
    }
    decline() {
        this.dialogRef.close(false);
    }
}
