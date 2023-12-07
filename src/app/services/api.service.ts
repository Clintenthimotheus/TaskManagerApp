import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Task } from 'src/model/task';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //get all task details
  getAllTask(): Observable<Task> {
    return this.http.get('http://localhost:3000/task')
  }
  //function call for view particular task details :-http://localhost:3000/task/2
  viewTaskDetails(taskId: string) {
    return this.http.get(`http://localhost:3000/task/${taskId}`)
  }
 
  //apicall for getting Taskstatus
  getTaskstatus(TaskstatusId:string){
    return this.http.get(`http://localhost:3000/Taskstatus/${TaskstatusId}`)
  }
  //status view frontpage
  getTask(){
    return this.http.get(`http://localhost:3000/Taskstatus`)
  }
  //add task
  addTask(taskBody:any){
    return this.http.post('http://localhost:3000/task',taskBody)
  }
 //delete a particular task
 deleteTasks(taskId:any){
return this.http.delete(`http://localhost:3000/task/${taskId}`)
 }
//edit
editTask(taskId:any,taskBody:any,taskstay:any){
return this.http.put(`http://localhost:3000/task/${taskId}`,taskBody)
}
}
