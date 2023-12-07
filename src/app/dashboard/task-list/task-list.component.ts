import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Task } from 'src/model/task';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  // taskTitle:string='' //create an object of all task
  task: Task = {}//create an object of all task
  allTask: any = []; //to hold task details //to hold the group id of the contact
  statusList: any = [];
  searchKey: string = '';

  constructor(private api: ApiService, private router: Router, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.api.getAllTask().subscribe((data: Task) => {
      console.log(data);
      this.allTask = data
      this.api.getTask().subscribe((statuses: any) => {
        console.log(statuses);
        // this.statusName=result
        this.statusList = statuses;
        this.mapStatusToTasks();
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

  taskFormAdd() {
    if (this.taskForm.valid) {
      const id = this.taskForm.value.id;
      const Title = this.taskForm.value.Title;
      const Description = this.taskForm.value.Description;
      const TaskstatusId = this.taskForm.value.TaskstatusId;

      if (id && this.isIdUnique(id)) {
        this.api.addTask({ id, Title, Description, TaskstatusId }).subscribe((result: any) => {
          alert("Task added Successfully");
          this.taskForm.reset();
          this.api.getAllTask().subscribe((data: any) => {
            const newTask = data.find((task: any) => task.id === result.id);
            if (newTask) {
              const foundStatus = this.statusList.find((status: any) => status.id === newTask.TaskstatusId);
              newTask.statusName = foundStatus ? foundStatus.status : 'Unknown';
              this.allTask.push(newTask);
            }
          });
        });
      } else {
        alert("ID should be provided and unique. Please enter a different ID.");
      }
    }
  }

  isIdUnique(id: any) {
    return !this.allTask.some((task: any) => task.id === id);
  }







  //get status in table
  mapStatusToTasks(): void {
    console.log(this.allTask)
    this.allTask.forEach((task: any) => {
      console.log(this.statusList)
      const foundStatus = this.statusList.find((status: any) => status.id === task.TaskstatusId);
      console.log(foundStatus)
      task.statusName = foundStatus ? foundStatus.status : 'Unknown';
      console.log(task.statusName);
      // Assign status name to each task
    });
  }

  //add
  // addTask() {
  //   this.api.addTask(this.task).subscribe((result: any) => {
  //     alert("Task added SucessFully")
  //     this.task = {};
  //     this.api.getAllTask().subscribe((data: any) => {
  //       const newTask = data.find((task: any) => task.id === result.id);
  //       if (newTask) {
  //         const foundStatus = this.statusList.find((status: any) => status.id === newTask.TaskstatusId);
  //         newTask.statusName = foundStatus ? foundStatus.status : 'Unknown';
  //         this.allTask.push(newTask); // Add the updated task to the task list
  //       }
  //     });
  //   })
  // }
  //delete
  deleteTask(taskId: any) {
    this.api.deleteTasks(taskId).subscribe((result: any) => {
      alert("Deleted successfully");
      // Remove the deleted task from allTask array
      const taskIndex = this.allTask.findIndex((task: any) => task.id === taskId);
      if (taskIndex !== -1) {
        this.allTask.splice(taskIndex, 1);
      }
    });
  }

  //search
  search(event: any) {
    console.log(event.target.value);
    this.searchKey = event.target.value
    this.searchKey = event.target.value.toLowerCase();
  }

}
