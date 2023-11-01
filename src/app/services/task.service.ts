import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];

  private tasksUpdatedSource = new BehaviorSubject<Task[]>([]);
  tasksUpdated$ = this.tasksUpdatedSource.asObservable();
  constructor(private localStorageService: LocalStorageService) {
    this.loadTasksFromLocalStorage();
  }

  loadTasksFromLocalStorage(): Task[] {
    console.log("loadTasksFromLocalStorage")
    const data = this.localStorageService.getTaskData();
    if (data) {
      this.tasks = data;
    }
    return this.tasks;
  }

  saveTasksToLocalStorage(task: Task) {
    this.tasks.push(task);
    for (let i = 0 ; i < this.tasks.length ; i++) {
      console.log(JSON.stringify(this.tasks[i]));
    }
    this.localStorageService.saveTaskData(this.tasks);
    this.tasksUpdatedSource.next(this.tasks);
  }

  updateCompletion(id: string, status: any) {
    const taskToUpdate = this.tasks.find((task) => task.id === id);

    if (taskToUpdate) {
      taskToUpdate.completed = status;
    } else {
      console.error(`Task with ID ${id} not found.`);
    }
  }
}