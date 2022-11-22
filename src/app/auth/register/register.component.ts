import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
// import swal from 'sweetalert';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent  {

  public formSumitted = false;

  public registerForm = this.fb.group({
    nombre: ['gustavo', [Validators.required, Validators.minLength(3)]],
    email: ['tavo@gmail.com', [Validators.required, Validators.minLength(3), Validators.email]],
    password: ['12345', [Validators.required, Validators.minLength(3)]],
    password2: ['12345', [Validators.required, Validators.minLength(3)]],
    terminos: [false, [Validators.required]],

  }, {
    validators:this.passwordsIgauales('password','password2')
  });

  constructor( 
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _router: Router,
    ) { }

  crearUsuario():void {
    this.formSumitted = true;
    if( !this.registerForm.invalid){
      return;
    }

    this._usuarioService.crearUsuario(this.registerForm.value).subscribe( resp => {
      this._router.navigateByUrl('/dashboard')
    }, (err) => {
      Swal.fire('Error',err.error.msg, 'error')
    });

  }

  campoNoValido(campo:string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSumitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas(): boolean{
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    if( (pass1 !== pass2) &&  this.formSumitted) {
      return true;
    } else {
      return false;
    }
  }
  passwordsIgauales(pas1:string, pas2:string) {

    return  ( formGroup:FormGroup) => {
      const passControl1 = formGroup.get(pas1);
      const passControl2 = formGroup.get(pas2);
      if(passControl1 === passControl2) {
        passControl2?.setErrors(null);
      } else {
        passControl2?.setErrors({noEsIgual:true});
      }
    }

  }
}
