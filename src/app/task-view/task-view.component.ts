import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {
  TaskId: string = "" //to hold the id of the task
  task: any = [] //to hold particular task information
  taskstatusId: string = '' //to hold the group id of the contact
  status: string = '' //to hold status
  constructor(private activedRoute: ActivatedRoute, private api: ApiService) { }
  ngOnInit(): void {
    this.activedRoute.params.subscribe((data: any) => {
      console.log(data);
      console.log(data.id);
      this.TaskId = data.id
      console.log(this.TaskId)
      //get a particular task
      this.api.viewTaskDetails(this.TaskId).subscribe((result: any) => {
        console.log(result);
        this.task = result
        //taskstatus
        this.taskstatusId = result.TaskstatusId
        console.log(this.taskstatusId);

        this.api.getTaskstatus(this.taskstatusId).subscribe((data: any) => {
          console.log(data);
          this.status = data.status
          console.log(this.status);
        })

      })


    })
  }

}
