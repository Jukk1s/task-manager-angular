import {Component, EventEmitter, Output} from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model'
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Output() taskAdded: EventEmitter<void> = new EventEmitter();
  taskName: string = '';
  priority: 'low' | 'medium' | 'high' = 'low';

  constructor(private taskService: TaskService) {}
  
  onSubmit() {
    const newTask: Task = {
      id: uuidv4(),
      description: this.taskName,
      priority: this.priority,
      completed: 'notStarted',
    };
    
    this.taskService.saveTasksToLocalStorage(newTask);
    this.taskAdded.emit();

  }
}
