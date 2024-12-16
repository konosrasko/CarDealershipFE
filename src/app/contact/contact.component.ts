import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: false,

  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  communicationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.communicationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.communicationForm.valid) {
      console.log('Form Submitted', this.communicationForm.value);
      // Add your communication service logic here
    }
  }

}
