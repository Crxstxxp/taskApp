import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../services/task/task.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.page.html',
  styleUrls: ['./task-modal.page.scss'],
})
export class TaskModalPage implements OnInit {
  taskForm: FormGroup;
  task: Task;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private navParams: NavParams
  ) {
    this.task = this.navParams.get('task');
    this.taskForm = this.fb.group({
      title: [this.task.title, [Validators.required]],
      description: [this.task.description, [Validators.required]],
    });
  }

  ngOnInit() {}

  saveTask() {
    if (this.taskForm.valid) {
      const updatedTask = {
        ...this.task,
        ...this.taskForm.value,
      };
      this.modalController.dismiss({ task: updatedTask });
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
