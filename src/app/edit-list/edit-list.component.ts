import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Task } from 'src/model/task';
import { TaskStatus } from 'src/model/taskStatus';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  taskId: string = ''
  taskData: Task = {}
  taskstay: TaskStatus[] = []
  statusList: any = [];
  allTask: any = [];
  constructor(private activeRoute: ActivatedRoute, private api: ApiService, private route: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data: any) => {
      console.log(data);
      console.log(data.id);
      this.taskId = data.id

      this.api.viewTaskDetails(this.taskId).subscribe((result: any) => {
        console.log(result);
        this.taskData = result
        this.taskForm.patchValue(this.taskData)
      })
      this.api.getTask().subscribe((datas: any) => {
        console.log(datas);
        this.taskstay = datas
        
      })

    })
  }
  //validation
  taskForm = this.fb.group({
    id: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    Title: ['', [Validators.required]],
    Description: ['', [Validators.required]],
    TaskstatusId: ['', [Validators.required]]
  })



  taskFormEdit() {
    if (this.taskForm.valid) {
      const Title = this.taskForm.value.Title;
      const Description = this.taskForm.value.Description;
      const TaskstatusId = this.taskForm.value.TaskstatusId;


      this.api.editTask(this.taskId, { Title, Description, TaskstatusId }, this.taskstay).subscribe((result: any) => {
        alert("Task edited Successfully");
        this.taskForm.reset();
        this.route.navigateByUrl('dashboard')
      });

    }
  }
  // update() {
  //   this.api.editTask(this.taskId, this.taskData, this.taskstay).subscribe((result: any) => {
  //     console.log(result);
  //     alert("Task details updated")

  //     this.route.navigateByUrl('/')

  //   })
  // }


}
