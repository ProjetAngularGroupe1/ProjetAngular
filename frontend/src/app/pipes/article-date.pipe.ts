import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'articleDate' })
export class ArticleDatePipe implements PipeTransform {
    transform(d: Date): string {

        function padTo2Digits(num: number) {
            return num.toString().padStart(2, '0')
        }

        return (
            [
              d.getFullYear(),
              padTo2Digits(d.getMonth() + 1),
              padTo2Digits(d.getDate()),
            ].join('-') +
            ' ' +
            [
              padTo2Digits(d.getHours()),
              padTo2Digits(d.getMinutes()),
              padTo2Digits(d.getSeconds()),
            ].join(':')
          )
    }
}