import {Component} from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model'

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  
  taskName: string = '';
  priority: 'low' | 'medium' | 'high' = 'low';

  constructor(private taskService: TaskService) {}
  
  onSubmit() {

    const newTask: Task = {
      name: this.taskName,
      priority: this.priority,
      completed: false,
    };
    
    this.taskService.addTask(newTask);

  }
}
