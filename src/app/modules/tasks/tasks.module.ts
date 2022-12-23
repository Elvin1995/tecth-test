import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskAddComponent } from './components/task-add/task-add.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskAddComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    ReactiveFormsModule,
  ]
})
export class TasksModule { }
