import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transformer } from '../models/transformer';
import { ITransformerService } from '../services/ITransformerService';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-transformer-edit',
  templateUrl: './transformer-edit.component.html',
  styleUrls: ['./transformer-edit.component.css']
})
export class TransformerEditComponent implements OnInit {
  id;
  transformer: Transformer;

  transformerForm: FormGroup;
  formDataLoaded: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router,
    @Inject('ITransformerService') private transformerService: ITransformerService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      data => {
        this.id = data["params"]["id"];
        if (this.id == undefined || this.id == "undefined") {
          this.transformer = {
            name: "", id: undefined, allegiance: undefined, strength: 1, intelligence: 1, speed: 1,
            endurance: 1, rank: 1, courage: 1, firepower: 1, skill: 1
          };
          this.initForm();
        } else {
          this.transformerService.getTransformer(this.id).subscribe(
            data => {
              this.transformer = data;
              this.initForm();
            },
            error => console.log(error)
          );
        }
      }
    );
  }

  initForm() {
    //console.info("form  init starting...", this.transformer);
    this.transformerForm = new FormGroup({
      name: new FormControl(this.transformer.name, [Validators.required, Validators.maxLength(40)]),
      allegiance: new FormControl(this.transformer.allegiance, [Validators.required]),
      strength: new FormControl(this.transformer.strength, [Validators.required, Validators.min(1), Validators.max(10)]),
      intelligence: new FormControl(this.transformer.intelligence, [Validators.required, Validators.min(1), Validators.max(10)]),
      speed: new FormControl(this.transformer.speed, [Validators.required, Validators.min(1), Validators.max(10)]),
      endurance: new FormControl(this.transformer.endurance, [Validators.required, Validators.min(1), Validators.max(10)]),
      rank: new FormControl(this.transformer.rank, [Validators.required, Validators.min(1), Validators.max(10)]),
      courage: new FormControl(this.transformer.courage, [Validators.required, Validators.min(1), Validators.max(10)]),
      firepower: new FormControl(this.transformer.firepower, [Validators.required, Validators.min(1), Validators.max(10)]),
      skill: new FormControl(this.transformer.skill, [Validators.required, Validators.min(1), Validators.max(10)])
    });
    this.formDataLoaded = true;
  }

  private onFormSubmit = (formValue) => {
    this.saveTransformer({
      id: this.transformer.id, name: formValue.name, allegiance: formValue.allegiance,
      strength: formValue.strength, intelligence: formValue.intelligence, speed: formValue.speed,
      endurance: formValue.endurance, rank: formValue.rank, courage: formValue.courage,
      firepower: formValue.firepower, skill: formValue.skill
    });
  }

  saveTransformer(transformer: Transformer) {
    //console.log(transformer);
    if (transformer.id == undefined) {
      this.transformerService.addTransformer(transformer).subscribe(
        data => {
          //console.log(data);
        },
        error => console.log(error)
      );
    } else {
      this.transformerService.updateTransformer(transformer).subscribe(
        data => {
          //console.log(data);
        },
        error => console.log(error)
      );
    }
    this.router.navigate(['/transformers']);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.transformerForm.controls[controlName].hasError(errorName);
  }
}
