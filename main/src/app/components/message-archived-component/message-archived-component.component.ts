import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message-archived-component',
  imports: [MatIconModule],
  templateUrl: './message-archived-component.component.html',
  styleUrl: './message-archived-component.component.scss'
})
export class MessageArchivedComponent {
  constructor(private matDialogRef: MatSnackBarRef<MessageArchivedComponent>, @Inject(MAT_SNACK_BAR_DATA) public message: any) {
  }

  ngOnInit() { }

  close() {
    this.matDialogRef.dismiss();
  }


}
