import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorageKey = 'taskData';

  constructor() { }

  saveTaskData(data: Task[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  getTaskData(): any {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : null;
  }
}
