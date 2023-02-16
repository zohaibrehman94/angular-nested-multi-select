import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface StateGroup {
  letter: string;
  checked: boolean;
  names: string[];
}

/** @title Select with custom trigger text */
@Component({
  selector: 'select-custom-trigger-example',
  templateUrl: 'select-custom-trigger-example.html',
  styleUrls: ['select-custom-trigger-example.css'],
})
export class SelectCustomTriggerExample {
  inputValue: string = '';
  constructor(private _formBuilder: FormBuilder) {}

  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];
  stateRecord: any = [];
  states = new FormControl();

  toggleSelection(event: any, name: any, group: any) {
    if (event.checked) {
      this.stateRecord.push(name);
      this.states.setValue(this.stateRecord);
    } else {
      this.stateRecord = this.stateRecord.filter((x: any) => x !== name);
      this.states.setValue(this.states.value.filter((x: any) => x !== name));
    }
    console.log(this.states.value);
    this.inputValue = this.states.value.join(',');
  }

  toggleParent(event: any, group: any) {
    group.checked = event.checked;
    let states = this.states.value;
    states = states ? states : [];
    if (event.checked) {
      states.push(...group.names);
    } else {
      group.names.forEach((x: string) => {
        if (states.indexOf(x) > -1) {
          states.splice(states.indexOf(x), 1);
        }
      });
    }
    this.states.setValue(states);
    if (!event.checked) {
      this.states.setValue(
        this.states.value.filter((x: any) => !x.includes(group.names))
      );
    }
    this.stateRecord = this.states.value;
    console.log(this.states.value);
    this.inputValue = this.states.value.join(',');
  }

  stateList: StateGroup[] = [
    {
      letter: 'A',
      checked: false,
      names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas'],
    },
    {
      letter: 'C',
      checked: false,
      names: ['California', 'Colorado', 'Connecticut'],
    },
    {
      letter: 'D',
      checked: false,
      names: ['Delaware'],
    },
    {
      letter: 'F',
      checked: false,
      names: ['Florida'],
    },
  ];

  openOrClosePanel(event: any, trigger: any) {
    console.log(event, trigger);
  }
}

/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
