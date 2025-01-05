import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {TokenController} from './token_controller';
import {HttpStatusCode} from '@angular/common/http';
import {ToasterService} from '../toaster/toaster.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends TokenController {
  afm: string = ''
  password: string = ''
  newPassword: string = ''
  newPasswordConfirm: string = ''
  error: string = ''
  token?: string;
  user: any;
  newPasswordMode: boolean = false;
  tokenExpired: boolean = false;

  constructor(router: Router,private loginService: LoginService, private route: ActivatedRoute, private toast: ToasterService) {
    super(router)

    const savedToken = localStorage.getItem("token");
    //if token is in local storage
    if (savedToken) {
      if (this.tokenIsValid(savedToken)) {
        //redirect to home page if it's valid
        this.getRouter().navigate(['/home']);
      }
      else {
        //remove it if it's invalid
        localStorage.setItem("token", "");
      }
    }

    //look for error message param in case of redirect
    this.route.queryParams.subscribe(params => {
      if (params["error"]) {
        this.error = params["error"]
      }
      if(params["tokenExpired"]){
        this.tokenExpired = params["tokenExpired"]
        if(this.tokenExpired){
          // this.userService.Logout().subscribe(data =>
          // {
          //   this.toast.showSuccess('Επιτυχής Αποσύνδεση!')
          // })
          localStorage.clear();
        }
      }
    })

  }

  doLogin() {
    this.loginService.login(this.afm, this.password).subscribe({
      next:data=> {
        this.token = data.token;
        console.log('Received token:', this.token);
        if (this.token) {
          localStorage.setItem('token', this.token);
          this.getRouter()?.navigate(['/car']);
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        const errorMessage =
          error.status === 401
            ? 'Invalid credentials. Please try again.'
            : 'Something went wrong. Please try later.';
        this.toast.showError(errorMessage);
      },
    });
  }
  logout() {
        console.log('Logout successful:');
        localStorage.clear();
        this.toast.showSuccess('Successfully logged out!');
        this.getRouter()?.navigate(['/login']);

    }
}
