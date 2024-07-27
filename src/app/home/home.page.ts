import { Component } from '@angular/core';
import { TaskService, Task } from '../services/task/task.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { TaskModalPage } from '../task-modal/task-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks$: Observable<Task[]>;

  constructor(
    private taskService: TaskService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks$ = this.taskService.getTasks();
  }

  async openNewTaskModal() {
    const modal = await this.modalController.create({
      component: TaskModalPage,
      componentProps: {
        task: { title: '', description: '', completed: false },
      },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.taskService.addTask(data.task);
      this.loadTasks();
    }
  }

  async editTask(task: Task) {
    const modal = await this.modalController.create({
      component: TaskModalPage,
      componentProps: { task },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.taskService.updateTask(data.task);
      this.loadTasks();
    }
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id)
      .then(() => this.loadTasks())
      .catch((err) => console.error(err));
  }
}
