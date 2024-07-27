import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Task {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksCollection = this.firestore.collection<Task>('tasks');

  constructor(private firestore: AngularFirestore) {}

  getTasks(): Observable<Task[]> {
    return this.tasksCollection.valueChanges({ idField: 'id' });
  }

  getTask(id: string): Observable<Task | undefined> {
    return this.tasksCollection.doc<Task>(id).valueChanges();
  }

  addTask(task: Task): Promise<void> {
    const id = this.firestore.createId();
    console.log('Adding task with ID:', id);
    console.log('Task data:', { ...task, id });
    return this.tasksCollection.doc(id).set({ ...task, id });
  }

  updateTask(task: Task): Promise<void> {
    return this.tasksCollection.doc(task.id).update(task);
  }

  deleteTask(id: string): Promise<void> {
    return this.tasksCollection.doc(id).delete();
  }
}
