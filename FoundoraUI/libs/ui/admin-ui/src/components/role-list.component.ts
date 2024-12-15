import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role, RoleStore } from '@foundora-ui/data-access/admin';

@Component({
  selector: 'fd-role-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div *ngIf="store.roles(); let roles">
      <div class="mb-3">
        <h3>Role List</h3>
        <p>Total Roles: {{ store.length() }}</p>
      </div>

      <!-- Role Creation Form -->
      <div class="mb-4">
        <h4>Create New Role</h4>
        <form [formGroup]="roleForm" (ngSubmit)="createRole()">
          <div class="form-group mb-3">
            <label for="roleName">Role Name</label>
            <input
              id="roleName"
              type="text"
              class="form-control"
              formControlName="name"
              placeholder="Enter role name"
            />
            <div *ngIf="roleForm.get('name')?.invalid && roleForm.get('name')?.touched" class="text-danger">
              Role name is required.
            </div>
          </div>
          <button type="submit" class="btn btn-primary" [disabled]="roleForm.invalid">
            Create Role
          </button>
        </form>
      </div>

      <!-- Role List Table -->
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let role of roles; trackBy: trackRole">
            <td>{{ role.id }}</td>
            <td>{{ role.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      .table td,
      .table th {
        vertical-align: middle;
      }

      .text-danger {
        font-size: 0.9rem;
      }
    `,
  ],
})
export class RoleListComponent {
  store = inject(RoleStore);
  private fb = inject(FormBuilder);

  roleForm: FormGroup;

  constructor() {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  createRole() {
    if (this.roleForm.valid) {
      const roleName = this.roleForm.value.name;
      this.store.create({ roleName: roleName }); 
      this.roleForm.reset();
    }
  }

  trackRole(index: number, role: Role): string {
    return role.id;
  }
}
