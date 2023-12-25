/*
* Usage in HTML:
* *ngFor="let item of myArr | orderBy:'Name':true:false:false:false"
*
* Usage in Typescript:
* let myArr = Sorter.sort(myRawData, 'Name', false)
*/

import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {
    transform(items: any[], property: string, reserve: boolean = false, isNumericSort: boolean = false, isBooleanSort: boolean = false, isDateSort: boolean = false): any[] {
        if (!items) {
            return []
        }
        return Sorter.sort(items, reserve, property, isNumericSort, isBooleanSort, isDateSort)
    }
}

export class Sorter {
  constructor() {}

  static sort<T>(
    list: T[],
    reverse:        boolean,
    sortBy:         string = '',
    isNumericSort?: boolean,
    isBooleanSort?: boolean,
    isDateSort?:    boolean
  ): T[] {
    sortBy        = sortBy                 // by default null
    isNumericSort = isNumericSort || false // by default text sort
    isBooleanSort = isBooleanSort || false // by default text sort
    isDateSort    = isDateSort    || false // by default text sort
    reverse       = reverse       || false // by default no reverse

    const reversed = reverse ? -1 : 1

    if (isBooleanSort) {
        if (sortBy !== '' && sortBy !== null) { list.sort((a: any, b: any) => { return reversed * (Number(a[sortBy]) - Number(b[sortBy])) }) } 
        else                                  { list.sort((a: any, b: any) => { return reversed * (Number(a)         - Number(b))         }) }
    } 

    else if (isNumericSort) {
        if (sortBy !== '' && sortBy !== null) { list.sort((a: any, b: any) => { return reversed * (a[sortBy] - b[sortBy]) }) } 
        else                                  { list.sort((a: any, b: any) => { return reversed * (a         - b)         }) }
    } 

    else if (isDateSort) {
        if (sortBy !== '' && sortBy !== null) { list.sort((a: any, b: any) => { return reversed * (a[sortBy].valueOf() - b[sortBy].valueOf()) }) } 
        else                                  { list.sort((a: any, b: any) => { return reversed * (a        .valueOf() - b        .valueOf()) }) }
    } 

    else {
        if (sortBy !== '' && sortBy !== null) { list.sort((a: any, b: any) => { const x = a[sortBy].toLowerCase(); const y = b[sortBy].toLowerCase(); return x < y ? reversed * -1 : x > y ? reversed : 0 }) } 
        else                                  { list.sort((a: any, b: any) => { const x = a        .toLowerCase(); const y = b        .toLowerCase(); return x < y ? reversed * -1 : x > y ? reversed : 0 }) }
    }

    return list
  }
}
