import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../users/users.service';
import {ToasterService} from '../shared/toaster/toaster.service';
import {DealershipService} from './dealership.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dealership',
  standalone: false,

  templateUrl: './dealership.component.html',
  styleUrl: './dealership.component.css'
})
export class DealershipComponent {
  isLinear = true;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private dealershipService: DealershipService,
              private router: Router) {
    this.firstFormGroup = this.fb.group({
      name: ['', Validators.required],
      owner: ['', Validators.required],
    });

    this.secondFormGroup = this.fb.group({
      afm: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid
    ) {
      const formData = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
      };
      this.dealershipService.signUp(formData).subscribe({
        next: data => {
          this.router.navigate(['/login']);
        }});

    }
  }
}
