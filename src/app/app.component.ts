import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AlertPopupComponent } from './alert-popup/alert-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.showAlert(
      "Welcome to the ultimate Transformers simulation!",
      ["The fate of the planet Cybertron is in your hands. The winner of this simulation will ultimately rule over the planet.",
        "Let's start by adding some transformers. Good luck!"],
      "Begin"
    );
  }

  showAlert(title: string, message: string[], action: string) {
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