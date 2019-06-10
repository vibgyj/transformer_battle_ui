import { Component, OnInit, Inject } from '@angular/core';
import { ITransformerService } from '../services/ITransformerService';
import { Transformer } from '../models/transformer';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { UtilService } from '../services/UtilService';

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
    private dialog: MatDialog, private router: Router, private utilService: UtilService,
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
        this.actualWinners = data.victors;
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
      if (this.actualWinners.find(element => element.id == transformer.id))
        transformer.status = "Yes";
    });
    this.loosers.forEach(transformer => {
      if (!this.actualWinners.find(element => element.id == transformer.id))
        transformer.status = "Yes";
    });

    var totalCorrect = 0;
    totalCorrect += this.winners.filter(element => element.status == "Yes").length;
    totalCorrect += this.loosers.filter(element => element.status == "Yes").length;
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
      this.utilService.showAlert(
        "You've won! Game Over.",
        "You've guessed more than 50 % right. Well done!",
        "Start over");
    } else {
      this.utilService.showAlert(
        "Game Over. You've lost!",
        "You've run out of guesses. Better luck next time!",
        "Try again");
    }
  }
}

export class TransformerDisplay {
  id: string;
  name: string;
  status: string;
}