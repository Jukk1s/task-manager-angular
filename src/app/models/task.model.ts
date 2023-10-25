export interface Task {
    name: string;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
  }