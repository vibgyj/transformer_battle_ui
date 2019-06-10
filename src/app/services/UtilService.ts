import { MatDialog } from '@angular/material';
import { AlertPopupComponent } from '../alert-popup/alert-popup.component';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
    constructor(private dialog: MatDialog, private router: Router) { }

    showAlert(title: string, message: string, action: string) {
        this.showAlertMultiPara(title, [message], action);
    }

    showAlertMultiPara(title: string, message: string[], action: string) {
        const dialogRef = this.dialog.open(AlertPopupComponent, {
            width: '450px',
            data: {
                title: title,
                message: message,
                action: action
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(['/transformers']);
        });
    }
}