import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'client';
    private readonly authService: AuthService = inject(AuthService);

    constructor() {
        this.authService.checkLoginStatus().subscribe();
    }
}
