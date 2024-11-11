import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let spectator: Spectator<SignInComponent>;
  const createComponent = createComponentFactory(SignInComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
