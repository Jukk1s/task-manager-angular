/**
 * The `TaskService` class is responsible for managing tasks, including their creation, modification,
 * and removal. It also communicates with the `LocalStorageService` to persist task data in local storage.
 */

import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  /**
   * A BehaviorSubject used to publish updates to the list of tasks. 
   * Observers that subscribe to this receive notification when tasks are modified or added.
   */
  private tasksUpdatedSource = new BehaviorSubject<Task[]>([]);
  tasksUpdated$ = this.tasksUpdatedSource.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    this.loadTasksFromLocalStorage();
  }

  /**
   * Loads task data from local storage and updates the internal list of tasks.
   * @returns An array of Tasks retrieved from local storage.
   */
  loadTasksFromLocalStorage(): Task[] {
    const data = this.localStorageService.getTaskData();
    if (data) {
      this.tasks = data;
    }
    return this.tasks;
  }

   /**
   * Adds a new task to the list, saves it to local storage, and notifies observers of the update.
   * @param task - The Task to be added.
   */
  saveTasksToLocalStorage(task: Task) {
    this.tasks.push(task);
    this.localStorageService.saveTaskData(this.tasks);
    this.tasksUpdatedSource.next(this.tasks);
  }

   /**
   * Updates the description of the task, saves the change to local storage, and notifies observers of the update.
   * @param id - The ID of the task to be updated.
   * @param newDescription - The new description for the task.
   */
  updateDescription(id: string, newDescription: string) {
    const taskToUpdate = this.tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      taskToUpdate.description = newDescription;
    } else {
      console.error(`Task with ID ${id} not found.`);
    }
    this.localStorageService.saveTaskData(this.tasks);
  }

  /**
   * Updates the priority of the task, saves the change to local storage, and notifies observers of the update.
   * @param id - The ID of the task to be updated.
   * @param newPriority - The new priority for the task.
   */
  updatePriority(id: string, newPriority: 'high' | 'medium' | 'low') {
    const taskToUpdate = this.tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      taskToUpdate.priority = newPriority;
    } else {
      console.error(`Task with ID ${id} not found.`);
    }
    this.localStorageService.saveTaskData(this.tasks);
  }

  /**
   * Updates the completion status of the task, saves the change to local storage, and notifies observers of the update.
   * @param id - The ID of the task to be updated.
   * @param newState - The new completion state for the task.
   */
  updateCompletion(id: string, newState: 'completed' | 'inProgress' | 'notStarted') {
    const taskToUpdate = this.tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      taskToUpdate.completed = newState;
    } else {
      console.error(`Task with ID ${id} not found.`);
    }
    this.localStorageService.saveTaskData(this.tasks);
  }

  /**
   * Deletes the task, saves the change to local storage, and notifies observers of the update.
   * @param id - The ID of the task to be deleted.
   */
  deleteTask(id: string) {
    const taskIndex = this.tasks.findIndex((task: Task) => task.id === id);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
    }
    this.localStorageService.saveTaskData(this.tasks);
    this.tasksUpdatedSource.next(this.tasks);
  }
}