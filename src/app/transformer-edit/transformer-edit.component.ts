import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transformer } from '../models/transformer';
import { ITransformerService } from '../services/ITransformerService';

@Component({
  selector: 'app-transformer-edit',
  templateUrl: './transformer-edit.component.html',
  styleUrls: ['./transformer-edit.component.css']
})
export class TransformerEditComponent implements OnInit {
  id;
  transformer: Transformer;
  constructor(private route: ActivatedRoute, private router: Router,
    @Inject('ITransformerService') private transformerService: ITransformerService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      data => {
        this.id = data["params"]["id"];
        if (this.id == undefined || this.id == "undefined") {
          this.transformer = new Transformer();
        } else {
          this.transformerService.getTransformer(this.id).subscribe(
            data => {
              this.transformer = data;
            },
            error => console.log(error)
          );
        }
      });
  }

  saveClicked() {
    console.log(this.transformer);
    if (this.transformer.Id == undefined) {
      this.transformerService.addTransformer(this.transformer).subscribe(
        data => {
          //console.log(data);
        },
        error => console.log(error)
      );
    } else {
      this.transformerService.updateTransformer(this.transformer).subscribe(
        data => {
          //console.log(data);
        },
        error => console.log(error)
      );
    }
    this.router.navigate(['/transformers']);
  }
}
