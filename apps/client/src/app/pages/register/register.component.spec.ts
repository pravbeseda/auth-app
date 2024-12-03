import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let spectator: Spectator<RegisterComponent>;
  const createComponent = createComponentFactory(RegisterComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
