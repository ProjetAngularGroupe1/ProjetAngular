import { CanActivateFn } from '@angular/router';

export const firstGuard: CanActivateFn = (route, state) => {
  return true;
};
