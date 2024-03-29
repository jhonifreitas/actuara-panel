import { FormControl } from '@angular/forms';
import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnChanges {

  @Input() label!: string;
  @Input() control!: FormControl;

  @Input() id = '';
  @Input() hint = '';
  @Input() class = '';
  @Input() type = 'text';
  @Input() inputmode = '';
  @Input() cdkFocus = false;
  @Input() showLabel = true;
  @Input() placeholder = '';
  @Input() maxlength: number | string = '';

  // MASK
  @Input() mask?: { format?: string; prefix?: string; suffix?: string; dropSpecialCharacters?: boolean };

  // TEXTAREA
  @Input() rows = 1;

  // SELECT
  @Input() selectId = 'id';
  @Input() multiple = false;
  @Input() items: any[] = [];
  @Input() selectName = 'name';
  filteredItems: any[] = [];

  // EVENT
  @Output() inputChange = new EventEmitter();

  // CURRENCY
  currencyOpts = { prefix: 'R$ ', thousands: '.', decimal: ',', align: 'left' };

  // PASSWORD
  togglePass = true;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items) this.filteredItems = changes.items.currentValue;
  }

  emit(item: string, event?: any) {
    if (item === 'inputChange') this.inputChange.emit(event);
  }
}
