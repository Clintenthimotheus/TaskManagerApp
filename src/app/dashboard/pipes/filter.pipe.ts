import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allTask: any[], searchTerm: string,propsName:string): any[] {
    const result:any[]=[]
    if(!allTask||searchTerm==''||propsName==''){
      return allTask
    }
    allTask.forEach((data:any)=>{
      if(data[propsName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase()))
      result.push(data)
    })
    return result;
  }

}
