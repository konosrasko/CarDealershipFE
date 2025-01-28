import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {TokenController} from './token_controller';
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
  userRole: string = '';
  userId!: number;
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

  decodeJwt(token: string) {
    // Split the token into its three parts (header, payload, signature)
    const parts = token.split('.');

    // Decode the payload (the second part of the JWT)
    const payload = parts[1];

    // Base64Url decode the payload
    const decodedPayload = this.base64UrlDecode(payload);

    // Parse the JSON string into an object
    const parsedPayload = JSON.parse(decodedPayload);

    // Extract the role (assuming it's stored in the 'role' property)
    return parsedPayload.role;
  }

  base64UrlDecode(base64Url: string): string {
    // Replace non-base64 characters with base64 compatible ones
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    // Add padding if necessary
    const padding = '='.repeat((4 - base64.length % 4) % 4);
    const base64WithPadding = base64 + padding;

    // Decode the base64 string
    const decodedString = atob(base64WithPadding);

    return decodedString;
  }

  doLogin() {
        this.loginService.login(this.afm, this.password).subscribe({
      next:data=> {
        this.token = data.token;
        console.log('Received token:', this.token);
        if (this.token) {
          localStorage.setItem('token', this.token);
          this.userRole = this.decodeJwt(this.token);
          console.log('Role:',this.userRole);
          localStorage.setItem('userRole',this.userRole);
          localStorage.setItem('afm',this.afm);
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
