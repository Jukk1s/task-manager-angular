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
    const data = this.localStorageService.getTaskData();
    if (data) {
      this.tasks = data;
    }
    return this.tasks;
  }

  saveTasksToLocalStorage(task: Task) {
    this.tasks.push(task);
    this.localStorageService.saveTaskData(this.tasks);
    this.tasksUpdatedSource.next(this.tasks);
  }

  updateDescription(id: string, newDescription: string) {
    const taskToUpdate = this.tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      taskToUpdate.description = newDescription;
    } else {
      console.error(`Task with ID ${id} not found.`);
    }
    this.localStorageService.saveTaskData(this.tasks);
  }

  updatePriority(id: string, newPriority: 'high' | 'medium' | 'low') {
    const taskToUpdate = this.tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      taskToUpdate.priority = newPriority;
    } else {
      console.error(`Task with ID ${id} not found.`);
    }
    this.localStorageService.saveTaskData(this.tasks);
  }

  updateCompletion(id: string, newStatus: 'completed' | 'inProgress' | 'notStarted') {
    const taskToUpdate = this.tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      taskToUpdate.completed = newStatus;
    } else {
      console.error(`Task with ID ${id} not found.`);
    }
    this.localStorageService.saveTaskData(this.tasks);
  }

  deleteTask(id: string) {
    const taskIndex = this.tasks.findIndex((task: Task) => task.id === id);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
    }
    this.localStorageService.saveTaskData(this.tasks);
    this.tasksUpdatedSource.next(this.tasks);
  }

}