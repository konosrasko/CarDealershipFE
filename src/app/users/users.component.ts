import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UsersService} from './users.service';
import {ToasterService} from '../shared/toaster/toaster.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  isLinear = true;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UsersService,
              private router: Router) {
    this.firstFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
      this.userService.signUp(formData).subscribe({
        next: data => {
          this.router.navigate(['/login']);
        }});

    }
  }
}
