import { Component, OnInit, Inject } from '@angular/core';
import { ITransformerService } from '../services/ITransformerService';
import { Transformer } from '../models/transformer';

@Component({
  selector: 'app-transformers-list',
  templateUrl: './transformers-list.component.html',
  styleUrls: ['./transformers-list.component.css']
})
export class TransformersListComponent implements OnInit {
  autobots: Transformer[];
  decepticons: Transformer[];
  constructor(@Inject('ITransformerService') private transformerService: ITransformerService) { }

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

  deleteClicked(allegiance, id) {
    if (!confirm("Do you really want to delete this transformer?")) return;

    this.transformerService.deleteTransformer(id);

    if (allegiance == "Autobot") {
      this.removeFromList(this.autobots, id);
    } else {
      this.removeFromList(this.decepticons, id);
    }
  }

  removeFromList(list, id) {
    var index = list.findIndex(element => element.Id == id);
    if (index != -1) {
      list.splice(index, 1);
    }
    console.log(list);
  }
}
