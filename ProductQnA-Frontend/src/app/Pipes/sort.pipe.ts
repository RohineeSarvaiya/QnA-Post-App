import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<String>, args:any): any {
   const sortField = args;
   if ( sortField=="likeCount" || sortField=="createdDate" || sortField=="commentCount" )
   {
    value.sort((a:any , b:any) => {
      if(a[sortField]<b[sortField]){
        return 1;
      }
      else if(a[sortField] > b[sortField]){
        return -1;
      }
      else{
        return 0;
      }
    }); 
  }

  else {
    value.sort((a:any , b:any) => {
     if(a[sortField]<b[sortField]){
       return -1;
     }
     else if(a[sortField] > b[sortField]){
       return 1;
     }
     else{
       return 0;
     }
    });
  }

  return value;
  
  }

}
