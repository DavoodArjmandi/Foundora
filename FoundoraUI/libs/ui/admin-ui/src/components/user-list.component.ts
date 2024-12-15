import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStore } from '@foundora-ui/data-access/admin';
import { RoleStore } from '@foundora-ui/data-access/admin';
import { User, Role } from '@foundora-ui/data-access/admin';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'fd-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="store.users(); let users">
      <div class="mb-3">
        <h3>User List</h3>
        <p>Total Users: {{ store.length() }}</p>
      </div>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">Roles</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users; trackBy: trackUser">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>
              <ul class="list-unstyled">
                <li *ngFor="let role of user.roles">{{ role }}</li>
              </ul>
            </td>
            <td>
              <button class="btn btn-primary btn-sm" (click)="openModal(user)">Assign Role</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div
      class="modal"
      tabindex="-1"
      [class.show]="isModalOpen"
      [style.display]="isModalOpen ? 'block' : 'none'"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Manage Roles for {{ selectedUser?.username }}</h5>
            <button type="button" class="btn-close" aria-label="Close" (click)="closeModal()"></button>
          </div>
          <div class="modal-body">
            <div *ngIf="selectedUser">
              <p>Current Roles:</p>
              <ul class="list-group mb-3">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                  *ngFor="let role of selectedUser.roles"
                >
                  {{ role }}
                  <button
                    class="btn btn-danger btn-sm"
                    (click)="removeRole(role)"
                  >
                    Remove
                  </button>
                </li>
              </ul>

              <div>
                <p>Assign New Role:</p>
                <select class="form-control" [(ngModel)]="selectedRoleId">
                  <option *ngFor="let role of roleStore.roles()" [value]="role.id">
                    {{ role.name }}
                  </option>
                </select>
                <button
                  class="btn btn-success btn-sm mt-2"
                  (click)="assignRole()"
                >
                  Assign Role
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              (click)="closeModal()"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .table td,
      .table th {
        vertical-align: middle;
      }
      .modal {
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1050;
      }
      .modal .modal-dialog {
        z-index: 1060;
      }
      .modal.show {
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
      }
    `,
  ],
})
export class UserListComponent {
  store = inject(UserStore);
  roleStore = inject(RoleStore); // Inject RoleStore to fetch roles
  isModalOpen = false;
  selectedUser: User | null = null;
  selectedRoleId: string | null = null; // Holds the selected role ID

  trackUser(index: number, user: User): string {
    return user.id;
  }

  openModal(user: User): void {
    this.selectedUser = user;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedUser = null;
    this.selectedRoleId = null;
  }

  removeRole(role: string): void {
    if (this.selectedUser) {
      const roles = this.selectedUser.roles.filter((r) => r !== role);
      this.selectedUser = { ...this.selectedUser, roles };
      // Update roles in the backend
      this.roleStore.remove({ UserId: this.selectedUser.id, RoleName: role });
    }
  }

  assignRole(): void {
    if (this.selectedUser && this.selectedRoleId) {
      const role = this.roleStore.roles().find((r) => r.id === this.selectedRoleId)?.name;
      if (role && !this.selectedUser.roles.includes(role)) {
        const roles = [...this.selectedUser.roles, role];
        this.selectedUser = { ...this.selectedUser, roles };
        this.roleStore.assign({ UserId: this.selectedUser.id, RoleName: role });
        this.selectedRoleId = null; 
      }
    }
  }
}
