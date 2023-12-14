import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'firstPipe' })
export class FirstPipe implements PipeTransform {
    transform(s: string): string {
        return s + " >>> This is a text added by first pipe. <<<"
    }
}