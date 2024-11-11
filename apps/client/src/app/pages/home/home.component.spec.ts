import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let spectator: Spectator<HomeComponent>;
  const createComponent = createComponentFactory(HomeComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
