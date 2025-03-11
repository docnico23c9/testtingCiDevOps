import { Component, signal } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormBuilder } from '../../../../node_modules/@angular/forms/index';

@Component({
  selector: 'app-formu-group',
  standalone: true,
  imports: [ReactiveFormsModule,ReactiveFormsModule,JsonPipe,FormsModule,FormGroup, RouterOutlet],
  templateUrl: './formu-group.component.html',
  styleUrl: './formu-group.component.scss'
})

export class FormuGroupComponent {
  contactForm!: FormGroup;
constructor( 
  private fb: FormBuilder,
  private contactService: ContactService,
    private toastrService: ToastrService,
    private loginService: LoginService,
    private userService:UserProfileService){
  this.initiateForm();
}

  //form = signal <FormGroup>(
   // new FormGroup({
     // tel: new FormControl(''),
     // sector: new FormControl(''),
     // lags: new FormControl([]),
      //name: new FormControl( ['',
      //Validators.required, Validators.minLength(2),Validators.pattern(/[a-zA-Z]/)]
      //), 
  
   // })
initiateForm(){
  this.contactForm = this.fb.group(
    {
      name:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message:['', Validators.required],
    });
}  
onSubmit(){
  if (this.contactForm.valid){
    this.contactService.sendMessage(this.contactForm.value).subscribe({
      next:(response) => {
        this.toastsService.success('Message sent Successfully');
        this.contactForm.reset();
      },
      error:(error) => {
        this.toastsService.error('error sending Message please try again');
      }
    });
  }
}

}
