import { Pipe, PipeTransform } from '@angular/core';
import {Ires_subjectlist} from "../../../models/response";

@Pipe({
  name: 'filterSemester'
})
export class FilterPeoplePipe implements PipeTransform {

  transform(values: Ires_subjectlist[], ...args: number[]): Ires_subjectlist[] {
    return values.filter(v => v.Semester = 5);
  }

}
