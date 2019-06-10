import { Component, OnInit, Inject } from '@angular/core';
import { ITransformerService } from '../services/ITransformerService';
import { Transformer } from '../models/transformer';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material';
import { AlertPopupComponent } from '../alert-popup/alert-popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-run-simulation',
  templateUrl: './run-simulation.component.html',
  styleUrls: ['./run-simulation.component.css']
})
export class RunSimulationComponent implements OnInit {

  autobots: TransformerDisplay[];
  decepticons: TransformerDisplay[];
  winners: TransformerDisplay[];
  loosers: TransformerDisplay[];
  actualWinners: Transformer[];
  correctness: number = 0;
  transformersCount: number = 0;

  constructor(
    private dialog: MatDialog, private router: Router,
    @Inject('ITransformerService') private transformerService: ITransformerService
  ) { }

  ngOnInit() {
    this.transformerService.getTransformers('Autobot').subscribe(
      data => {
        this.autobots = data;
        this.transformersCount += data.length;
        console.log(this.transformersCount);
      },
      error => console.log(error)
    );
    this.transformerService.getTransformers('Decepticon').subscribe(
      data => {
        this.decepticons = data;
        this.transformersCount += data.length;
        console.log(this.transformersCount);
      },
      error => console.log(error)
    );
    this.winners = [];
    this.loosers = [];
    this.transformerService.runSimulation().subscribe(
      data => {
        this.actualWinners = data;
      },
      error => console.log(error)
    );
  }

  drop(event: CdkDragDrop<TransformerDisplay[]>) {
    // if (!confirm("Are you sure?")) return;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      // Check if the moved item is part of winner list or not
      this.checkCorrectness();
    }
  }

  checkCorrectness() {
    this.winners.forEach(transformer => {
      if (this.actualWinners.find(element => element.Id == transformer.Id))
        transformer.Status = "Yes";
    });
    this.loosers.forEach(transformer => {
      if (!this.actualWinners.find(element => element.Id == transformer.Id))
        transformer.Status = "Yes";
    });

    var totalCorrect = 0;
    totalCorrect += this.winners.filter(element => element.Status == "Yes").length;
    totalCorrect += this.loosers.filter(element => element.Status == "Yes").length;
    this.correctness = totalCorrect * 100 / this.transformersCount;

    if (this.correctness > 50) {
      this.gameOver(true);
    }
    if (this.winners.length + this.loosers.length == this.transformersCount) {
      this.gameOver(false);
    }
  }

  gameOver(won: boolean) {
    if (won) {
      this.showAlert(
        "You've won! Game Over.",
        "You've guessed more than 50 % right. Well done!",
        "Start over");
    } else {
      this.showAlert(
        "Game Over. You've lost!",
        "You've run out of guesses. Better luck next time!",
        "Try again");
    }
  }

  showAlert(title: string, message: string, action: string) {
    const dialogRef = this.dialog.open(AlertPopupComponent, {
      width: '450px',
      data: {
        title: title,
        message: [message],
        action: action
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/transformers']);
    });
  }
}

export class TransformerDisplay {
  Id: string;
  Name: string;
  Status: string;
}