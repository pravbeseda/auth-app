import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {}
