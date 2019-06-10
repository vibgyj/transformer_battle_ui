import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skills-display',
  templateUrl: './skills-display.component.html',
  styleUrls: ['./skills-display.component.css']
})
export class SkillsDisplayComponent implements OnInit {

  @Input() transformer: Transformer;
  @Input() xFactor: number;

  constructor() { }

  ngOnInit() {
  }

}
