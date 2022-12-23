import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskListComponent} from './components/task-list/task-list.component';
import {TaskAddComponent} from './components/task-add/task-add.component';

const routes: Routes = [
  {path: '', component: TaskListComponent},
  {path: 'add', component: TaskAddComponent},
  {path: 'edit/:id', component: TaskAddComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
