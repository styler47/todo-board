import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

    getItem<Type>(name: string, defaultValue: any): Type {
      let val;
      try {
        val = window.localStorage.getItem(name) ?? '';
        val = JSON.parse(val);
      } catch (e) {
        val = defaultValue;
      }
      return val;
    }

    setItem<T>(name: string, value: T): void {
      localStorage.setItem(name, JSON.stringify(value));
    }
}
