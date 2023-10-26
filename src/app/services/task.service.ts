import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];

  private tasksUpdatedSource = new BehaviorSubject<Task[]>([]);
  tasksUpdated$ = this.tasksUpdatedSource.asObservable();

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.tasksUpdatedSource.next(this.tasks);
  }
}