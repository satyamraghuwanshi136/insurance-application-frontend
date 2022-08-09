import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  constructor() { }
  purchaseForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {

  }

  purchase() {

  }
}
