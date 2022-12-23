import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API} from '../../../../environments/environment';
import {ITasks} from '../interfaces/tasks.interface';

const HOST_URL = `${API}tasks`;

export class URLs {
  static readonly TASK_CREATE: string = `${HOST_URL}`;
  static readonly TASK_LIST: string = `${HOST_URL}`;
  static readonly TASK_RUD = (id: number) => `${HOST_URL}/${id}`;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  createTask(body: ITasks) {
    return this.http.post(URLs.TASK_CREATE, body);
  }

  getTaskList(searchBody: ITasks) {
    let params = new HttpParams();
    Object.keys(searchBody).forEach(key => {
      if (searchBody[key] !== '' && searchBody[key] !== null) {
        params = params.set(key, searchBody[key]);
      }
    });
    return this.http.get(URLs.TASK_LIST, {params});
  }

  getTaskWithId(id: number): Observable<ITasks> {
    return this.http.get<ITasks>(URLs.TASK_RUD(id));
  }

  editTask(id: number, changedVal: any) {
    return this.http.patch(URLs.TASK_RUD(id), changedVal);
  }

  deleteTask(id: number) {
    return this.http.delete(URLs.TASK_RUD(id));
  }
}
