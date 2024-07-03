import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivateFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ConfirmDialogComponent } from '../../shared/confirm/confirm.component';

export interface CanDeactivateComponent {
  canDeactivate: () => boolean;
  dialogTitle?: string;
  dialogContent?: string;
}

export const canExitGuard: CanDeactivateFn<CanDeactivateComponent> = (component) => {
  const dialog = inject(MatDialog);
  const title = component.dialogTitle || 'Conferma';
  const content = component.dialogContent || 'Sei sicuro di voler abbandonare la pagina?';

  const data = { title, content };
  if (component.canDeactivate()) {
    return Promise.resolve(true);
  } else {
    const dialogRef = dialog.open(ConfirmDialogComponent, {
      data,
    } );
    return firstValueFrom(dialogRef.afterClosed()).then((result: any) => {
      return result || false;
    });
  }
};
