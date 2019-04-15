import { InjectionToken } from '@angular/core';

const baseUrl = 'http://localhost:3000';
export const api = new InjectionToken<string>('ApiUrl');

export const ApiProvider = {
  provide: api,
  useValue: baseUrl
};
