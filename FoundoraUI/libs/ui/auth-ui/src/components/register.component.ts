import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div class="card p-4 shadow" style="width: 400px;">
        <h4 class="card-title text-center mb-3">Register</h4>
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              formControlName="username"
              [class.is-invalid]="registerForm.get('username')?.touched && registerForm.get('username')?.invalid"
            />
            <div *ngIf="registerForm.get('username')?.touched && registerForm.get('username')?.invalid" class="invalid-feedback">
              Username is required.
            </div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              class="form-control"
              formControlName="email"
              [class.is-invalid]="registerForm.get('email')?.touched && registerForm.get('email')?.invalid"
            />
            <div *ngIf="registerForm.get('email')?.touched && registerForm.get('email')?.invalid" class="invalid-feedback">
              Valid email is required.
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              class="form-control"
              formControlName="password"
              [class.is-invalid]="registerForm.get('password')?.touched && registerForm.get('password')?.invalid"
            />
            <div *ngIf="registerForm.get('password')?.touched && registerForm.get('password')?.invalid" class="invalid-feedback">
              Password is required.
            </div>
          </div>
          <button type="submit" class="btn btn-primary w-100" [disabled]="registerForm.invalid">Register</button>
        </form>
        <div class="mt-3 text-center">
          <a routerLink="/login" class="text-decoration-none">Already have an account? Login</a>
        </div>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Registration Data:', this.registerForm.value);
    }
  }
}