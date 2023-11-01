export interface Task {
    id: string;
    name: string;
    priority: 'low' | 'medium' | 'high';
    completed: 'completed' | 'inProgress' | 'notStarted';
  }