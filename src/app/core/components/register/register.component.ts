import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  constructor() {}

  ngOnInit(): void {}
  onSubmit(form) {
    console.log(form);
  }
}