import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hidePassword = false;
  hideConfirmPassword = false;

  constructor(
    private tilteService: Title
  ) { }

  ngOnInit(): void {
    this.tilteService.setTitle("Sign Up");
  }

  inversePasswordType() {
    this.hidePassword = !this.hidePassword;
  }

  inverseConfirmPasswordType() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}
