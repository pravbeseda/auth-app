import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterModule, AsyncPipe],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    private readonly authService: AuthService = inject(AuthService);

    readonly isLoggedIn$ = this.authService.checkLoginStatus();
}
