import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css']
})
export class ChipComponent {
  @Input() text: string = "";
  @Input() backgroundColor = 'whitesmoke';
  @Input() selected = false;
  @Input() icon?: string;

}