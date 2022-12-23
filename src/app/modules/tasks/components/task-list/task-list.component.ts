import {Component, OnInit} from '@angular/core';
import {ITasks} from '../../interfaces/tasks.interface';
import {TaskService} from '../../service/task.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  taskList: ITasks[] = [];
  filterBody!: FormGroup;


  constructor(private router: Router,
              private fb: FormBuilder,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.filterBody = this.fb.group({
      label: [''],
      description: [''],
      category: [''],
      done: [''],
    });
    this.getTaskList();
  }

  setStatus(event: any) {
    this.filterBody.get('done')?.setValue((event.target.value === null ? '' : event.target.value));
  }

  navigateTo(id: number) {
    this.router.navigate(['/edit', id]);
  }

  getTaskList() {
    this.taskService.getTaskList(this.filterBody.value).subscribe((res: any) => {
      this.taskList = res;
    });
  }

  resetFilter() {
    this.filterBody.reset();
    this.taskService.getTaskList(this.filterBody.value).subscribe((res: any) => {
      this.taskList = res;
    });
  }

  deleteTask(id: any | undefined) {
    if (id) {
      if (confirm('Are you sure?')) {
        if (id) {
          this.taskService.deleteTask(id).subscribe(() => {
            this.taskList = this.taskList.filter(item => item.id !== +id);
          });
        }
      } else {
        return;
      }
    }
  }

  taskProcessing(task: ITasks) {
    task.done = !task.done ? this.formatDate(new Date()) : false;
    this.taskService.editTask(task.id, task).subscribe();
  }

  formatDate(date) {
    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
  }
}
