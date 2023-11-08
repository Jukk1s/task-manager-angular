import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

interface option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

/**
 * @class TaskListComponent displays the list of tasks in a table format and provides functionality to interact with and manage these tasks.
 */
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  hasTasks: boolean = false;
  dataSource = new MatTableDataSource<Task>();
  displayedColumns: string[] = ['description', 'priority', 'completed', 'delete'];

  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();

  priorityOptions: option[] = [
    { value: 'high', viewValue: 'High'},
    { value: 'medium', viewValue: 'Medium'},
    { value: 'low', viewValue: 'Low'},
  ];

  completedOptions: option[] = [
    { value: 'completed', viewValue: 'Completed'},
    { value: 'inProgress', viewValue: 'In Progress'},
    { value: 'notStarted', viewValue: 'Not Started'},
  ];

  constructor(private taskService: TaskService) {}

   /**
   * Initializes the component, retrieves tasks from local storage, and sets up sorting for the table.
   */
  ngOnInit() {
    this.getTasks();
    
    this.taskService.tasksUpdated$.subscribe(() => {
      this.getTasks();
    });
  }

  getTasks() {
    this.tasks = this.taskService.loadTasksFromLocalStorage();
    if (this.tasks.length > 0) {
      this.hasTasks = true;
    } else {
      this.hasTasks = false;
    }
    this.dataSource.data = this.tasks;
    this.dataSource.sort = this.sort;
  }

  /**
   * Handles the change of a task's description, saves the new description, and removes focus from the component.
   * @param desc - The new description.
   * @param taskId - ID of the task.
   */
  onDescriptionChange(desc: string, taskId: string) {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
    this.taskService.updateDescription(taskId, desc);
  }

  /**
   * Handles the change of a task's priority.
   * @param event - Event.
   * @param taskId - The ID of the task.
   */
  onSelectPriorityChange(event: any, taskId: string) {
    const selectedValue = event.value;
    this.taskService.updatePriority(taskId, selectedValue);
  }

  /**
   * Handles the change of a task's completion state.
   * @param event - Event.
   * @param taskId - The ID of the task.
   */
  onSelectCompletionChange(event: any, taskId: string) {
    const selectedValue = event.value;
    this.taskService.updateCompletion(taskId, selectedValue);
  }

  onDeleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
  }

  /**
   * Converts a task's priority state to a CSS class.
   * @param priority - The task priority.
   * @returns - The corresponding CSS class.
   */
  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'low':
        return 'green-text';
      case 'medium':
        return 'yellow-text';
      case 'high':
        return 'red-text';
      default:
        return '';
    }
  }

  /**
   * Converts a task's completion state to a CSS class.
   * @param completed - The task's completion level.
   * @returns - The corresponding CSS class.
   */
  getCompletedClass(completed: string): string {
    switch (completed) {
      case 'completed':
        return 'green-text';
      case 'inProgress':
        return 'yellow-text';
      case 'notStarted':
        return 'red-text';
      default:
        return '';
    }
  }
}
