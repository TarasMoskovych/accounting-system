import { InjectionToken } from '@angular/core';

// const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://accounting-system.onrender.com';
const accessKey = '63021dd5f337b15aefab6ee49a3b6b46';

export const currencyApi = `http://data.fixer.io/api/latest?access_key=${accessKey}`;
export const api = new InjectionToken<string>('ApiUrl');
export const ApiProvider = {
  provide: api,
  useValue: baseUrl
};
