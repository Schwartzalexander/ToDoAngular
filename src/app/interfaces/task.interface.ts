export interface Task {
  summary: string;
  description: string;
  completed: boolean;
  dueDate: string;
  uid?: string;
  cacheDate?: Date;
}
