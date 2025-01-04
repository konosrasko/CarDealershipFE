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
      next: data => {
        console.log(data);
        this.token = data;

        if (this.token != null) {
          localStorage.setItem('token', this.token);
          this.checkIfUserIsEnabled();
        }else{
          if(localStorage.getItem('message')!='Welcome')
          {
            this.toast.showError('Ειστε ήδη συνδεδεμένος από άλλη πηγή,αποσυνδεθείτε και προσπάθείστε ξανά');
          }
            this.getRouter()?.navigate(["/login"]);

        }
      },
      error: error => {
        this.toast.showError('Αποτυχία!');
      }
    });
  }

  changePassword() {
    if (this.newPassword == this.newPasswordConfirm) {
      this.user.password = this.newPassword;
      this.user.passTemp = false;
      // this.userService.editUserAccount(this.user, true, this.user.id).subscribe({
      //   next: data => {
      //     this.toast.showSuccess('Επιτυχία!')
      //     this.toast.showSuccess('Επιτυχής Αποθήκευση!');
      //     this.getRouter()?.navigate(['/home']);
      //   },
      //   error: error => {
      //     this.toast.showError('Αποτυχία!');
      //   }
      // })

    }
    else {
      this.toast.showError('Aποτυχία!');
    }
  }

  checkIfUserIsEnabled() {
    // this.userService.getUserDetails().subscribe({
      // next: data => {
      //   if (data) {
      //     this.user = data
      //     if (data.enable) {
      //       if (!this.user.passTemp) {
      //         this.getRouter()?.navigate(['/home/landing']);
      //       }
      //       else {
      //         this.openNewPasswordForm()
      //       }
      //     } else {
      //       this.error = "Ο λογαριασμός ειναι απενεργοποιημένος. Δεν έχετε δικαίωμα πρόσβασης."
      //     }
      //   }
      // },
      // error: error => {
      //   this.toast.error({
      //     detail: 'Αποτυχία!',
      //     summary: error.status === HttpStatusCode.GatewayTimeout ? "Πρόβλημα σύνδεσης με τον διακομιστή" : error.error,
      //     position: "topRight", duration: 4000
      //   });
      // }
    // })
  }

  openNewPasswordForm() {
    this.newPasswordMode = true;
  }
}
