import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    email: any;
    submitted: boolean;

  constructor() { }

  ngOnInit(): void {

  }
  onSubmit(){
    this.submitted = true;
    const emails = this.email;
    console.log('===', emails);

  }


}
