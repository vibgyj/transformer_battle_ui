import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { UtilService } from './services/UtilService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router, private utilService: UtilService) { }

  ngOnInit(): void {
    this.utilService.showAlertMultiPara(
      "Welcome to the ultimate Transformers simulation!",
      ["The fate of the planet Cybertron is in your hands. The winner of this simulation will ultimately rule over the planet.",
        "Let's start by adding some transformers. Good luck!"],
      "Begin"
    );
  }
}