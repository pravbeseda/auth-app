import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterModule, AsyncPipe],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    private readonly authService: AuthService = inject(AuthService);
    private readonly http = inject(HttpClient);

    readonly isLoggedIn$ = this.authService.checkLoginStatus();

    ngOnInit(): void {
        this.http.get('/auth/me', { withCredentials: true }).subscribe(
            response => console.log('Response:', response),
            error => console.error('Error:', error)
        );
    }
}
