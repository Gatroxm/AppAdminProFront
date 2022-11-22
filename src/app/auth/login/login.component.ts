import { Component, AfterViewInit, ViewChild,  ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'
declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit  {

  @ViewChild('googleBtn') googleBtn:any;
  public formSumitted = false;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.minLength(3), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    remember: [false]
  });

  constructor(
     private _router: Router,
     private fb: FormBuilder,
    private _usuarioService: UsuarioService
     ) {
     }
  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: '981240200068-vp7kfg26tmmanq1ev05pguhsbjje3qq2.apps.googleusercontent.com',
      callback: (response:any) =>this.handleCredentialResponse(response)
  });
  google.accounts.id.renderButton(
      this.googleBtn.nativeElement, {
          theme: "outline",
          size: "large"
      } // customization attributes
  );
  }
  handleCredentialResponse( response:any){
    let data = {
      'token': response.credential
    }
    this._usuarioService.loginGoogle(data).subscribe( resp  => {
      this._router.navigateByUrl('/dashboard')
    }, (err) => {
      Swal.fire('Error',err.error.msg, 'error')
    });
  }
  ngSubmit(){
    if(this.loginForm.valid){

      this._usuarioService.login(this.loginForm.value).subscribe( resp=>{
        if( this.loginForm.get('remember')?.value){
          localStorage.setItem('email', this.loginForm.get('email')?.value || '');
        }else {
          localStorage.removeItem('email');
        }
        this._router.navigateByUrl('/dashboard')
      }, (err) => {
        Swal.fire('Error',err.error.msg, 'error')
      });
    }
    // this._router.navigateByUrl('/')
  }
}
