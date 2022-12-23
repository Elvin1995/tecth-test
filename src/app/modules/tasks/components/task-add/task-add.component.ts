import {Component} from '@angular/core';
import {ITasks} from '../../interfaces/tasks.interface';
import {TaskService} from '../../service/task.service';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AddTask} from '../../interfaces/add-task';
import {TasksDynamicForm} from '../../interfaces/tasks-dynamic-form';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent {
  taskModel: ITasks = {
    id: 111,
    label: '',
    description: '',
    category: '',
    done: false,
  };
  addTasks: any;
  selectedId = 0;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
              private router: Router,
              private taskService: TaskService) {
    this.activatedRoute.params.subscribe((param: any) => {
      this.selectedId = param.id;
      if (this.selectedId) {
        this.formLoadById();
      } else {
        this.addTasks = new TasksDynamicForm([AddTask(this.taskModel)]);
      }
    });
  }

  formLoadById() {
    this.taskService.getTaskWithId(this.selectedId)?.subscribe((res: any) => {
      this.taskModel = res;
      console.log(this.taskModel);
      this.addTasks = new TasksDynamicForm([AddTask(this.taskModel)]);
      console.log(this.addTasks.form.value);
    });
  }

  saveOptionsForm() {
    if (this.addTasks.form.valid) {
      if (!this.selectedId) {
        this.taskService.createTask(this.addTasks.form.value).subscribe(() => {
          this.router.navigate(['/']);
          this.addTasks.form.reset();
        });
      } else {
        this.taskService.editTask(this.selectedId, this.addTasks.form.value).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
