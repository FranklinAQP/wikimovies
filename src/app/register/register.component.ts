import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterValidationsMessages } from '../core/helpers/messages/validations/register.validations.messages';
import { UserModel } from '../core/models/user.model';
import { AuthService } from '../core/services/auth.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('templateModal')
  templateRefModal!: TemplateRef<any>;
  validations = RegisterValidationsMessages;
  matcher = new MyErrorStateMatcher();

  message = '';
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });
  }
  handleSignUp(userToRegister: UserModel) {
    this.authService.signUp(userToRegister).subscribe({
      next: (response) => {
        this.openModal('El usuario se registró correctamente.');
      },
      error: (error) => {
        if (error.status === 400)
          this.snackBar.open('El usuario ya existe.', 'OK');
      },
    });
  }
  openModal(message: string) {
    this.message = message;
    const openDialog = this.dialog.open(this.templateRefModal);
    openDialog.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
  ngOnInit(): void {}

  getError(formControl: 'firstName' | 'lastName' | 'email' | 'password', type: string){
    return this.validations[formControl].find(item => item.type === type)?.message;
  }
}
