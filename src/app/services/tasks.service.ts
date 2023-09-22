import { Injectable } from '@angular/core';
import { RealtimeService } from './realtime.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Task } from '../tasks/models/model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private realtimeService: RealtimeService) {}

  insertDefaultTask() {
    const taskTitle = 'Primeira Task: Criar primeira Task 😎';
    const taskContent = `Seja bem vindo! Este app foi desenvolvido para ser intuitivo e simples de usar!
    Nessa tela você visualiza suas tasks e com o botão CRIAR TASK você pode registrar sua primeira tarefa`;
    const task: Task = {
      title: taskTitle,
      content: taskContent,
      done: false,
      id: null,
    };

    this.realtimeService.insertTask(task);
  }
}
