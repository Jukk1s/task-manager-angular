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
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
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

  ngOnInit() {
    this.getTasks();
    this.dataSource.sort = this.sort;
    this.taskService.tasksUpdated$.subscribe(() => {
      this.getTasks();
      this.dataSource.sort = this.sort;
    });
  }

  getTasks() {
    this.tasks = this.taskService.loadTasksFromLocalStorage();
    this.dataSource.data = this.tasks;
  }

  onDescriptionChange(desc: string, taskId: string) {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
    this.taskService.updateDescription(taskId, desc);
  }

  onSelectPriorityChange(event: any, taskId: string) {
    const selectedValue = event.value;
    this.taskService.updatePriority(taskId, selectedValue);
  }

  onSelectCompletionChange(event: any, taskId: string) {
    const selectedValue = event.value;
    this.taskService.updateCompletion(taskId, selectedValue);
  }

  onDeleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
  }

}
