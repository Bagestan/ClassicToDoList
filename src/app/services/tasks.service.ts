import { Injectable } from '@angular/core';
import { RealtimeService } from './realtime.service';
import { LocalStorageService } from './local-storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class TasksService {


  constructor(private db: RealtimeService, private localStorage: LocalStorageService, private angularAuth: AngularFireAuth) {
    this.angularAuth.authState.subscribe((result) => {console.log(result)})
  }

  insertDefaultTask(){
    const taskTitle = 'Primeira Task: Criar primeira Task 😎'
    const taskContent = `Seja bem vindo! Este app foi desenvolvido para ser intuitivo e simples de usar!
    Nessa tela você visualiza suas tasks e com o botão CRIAR TASK você pode registrar sua primeira tarefa`
  }



}
