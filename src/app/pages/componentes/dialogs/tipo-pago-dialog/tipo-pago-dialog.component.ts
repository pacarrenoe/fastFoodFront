import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-pago-dialog',
  templateUrl: './tipo-pago-dialog.component.html',
  styleUrl: './tipo-pago-dialog.component.scss'
})
export class TipoPagoDialogComponent {
  constructor(private dialogRef: MatDialogRef<TipoPagoDialogComponent>) {}

  seleccionar(tipo: string) {
    this.dialogRef.close(tipo);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
