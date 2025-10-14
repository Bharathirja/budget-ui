import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';

export interface ConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-dialog-component',
  imports: [MaterialModule],
  templateUrl: './confirm-dialog-component.component.html',
  styleUrl: './confirm-dialog-component.component.scss'
})
export class ConfirmDialogComponent {
 constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onConfirm(): void {
    // Close the dialog and return 'true' for confirmation
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog and return 'false' for dismissal
    this.dialogRef.close(false);
  }
}
