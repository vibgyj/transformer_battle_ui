import { Component, OnInit, Inject } from '@angular/core';
import { ITransformerService } from '../services/ITransformerService';
import { Transformer } from '../models/transformer';
import { Router } from '@angular/router';
import { UtilService } from '../services/UtilService';

@Component({
  selector: 'app-transformers-list',
  templateUrl: './transformers-list.component.html',
  styleUrls: ['./transformers-list.component.css']
})
export class TransformersListComponent implements OnInit {
  autobots: Transformer[];
  decepticons: Transformer[];
  constructor(
    private router: Router, private utilService: UtilService,
    @Inject('ITransformerService') private transformerService: ITransformerService) { }

  ngOnInit() {
    this.transformerService.getTransformers('Autobot').subscribe(
      data => {
        this.autobots = data;
        console.log(data);
      },
      error => console.log(error)
    );
    this.transformerService.getTransformers('Decepticon').subscribe(
      data => {
        this.decepticons = data;
      },
      error => console.log(error)
    );
  }

  editClicked(transformer) {
    if (transformer.rank > 8) {
      this.utilService.showAlert("Alert", "You can't edit a transformer with rank higher than 8.", "Ok");
      return;
    }

    this.router.navigate(['/transformer', transformer.id]);
  }

  deleteClicked(allegiance, id) {
    if (!confirm("Do you really want to delete this transformer?")) return;

    this.transformerService.deleteTransformer(id).subscribe(
      data => {
        if (allegiance == "Autobot") {
          this.removeFromList(this.autobots, id);
        } else {
          this.removeFromList(this.decepticons, id);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  removeFromList(list, id) {
    var index = list.findIndex(element => element.id == id);
    if (index != -1) {
      list.splice(index, 1);
    }
    console.log(index, list);
  }
}
