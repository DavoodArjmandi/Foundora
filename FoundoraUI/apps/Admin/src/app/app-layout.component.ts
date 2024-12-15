import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
     <div class="d-flex flex-column vh-100">
      <!-- Header -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Foundora</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link active" routerLink="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/User">User</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/Role">Role</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Main Content Area -->
      <div class="d-flex flex-grow-1">
        <!-- Sidebar -->
        <div class="bg-light p-3 border-end" style="width: 150px;">
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link" routerLink="/">Dashboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/User">User</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/Role">Role</a>
            </li>
          </ul>
        </div>

        <!-- Content -->
        <div class="flex-grow-1 p-3">
          <router-outlet></router-outlet>
        </div>
      </div>

      <!-- Footer -->
      <footer class="bg-dark text-white text-center py-3">
        <span>&copy; 2024 Foundora. All rights reserved.</span>
      </footer>
    </div>
  `,
  styles: ``,
})
export class AppLayoutComponent {
 
}