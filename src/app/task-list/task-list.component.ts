import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { MatTableDataSource } from '@angular/material/table';
import { TaskFormComponent } from '../task-form/task-form.component';
import { LocalStorageService } from '../services/local-storage.service';

interface completedOption {
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
  displayedColumns: string[] = ['name', 'priority', 'completed'];

  completedOptions: completedOption[] = [
    { value: 'completed', viewValue: 'Completed'},
    { value: 'inProgress', viewValue: 'In Progress'},
    { value: 'notStarted', viewValue: 'Not Started'},
  ];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
    this.taskService.tasksUpdated$.subscribe(() => {
      this.getTasks();
    });
  }

  getTasks() {
    this.tasks = this.taskService.loadTasksFromLocalStorage();
    this.dataSource.data = this.tasks;
  }

  onSelectCompletionChange(event: any, taskId: string) {
    const selectedValue = event.value;
    this.taskService.updateCompletion(taskId, selectedValue);

  }

}
