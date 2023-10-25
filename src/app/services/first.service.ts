import { from, Observable, of } from"rxjs";
import { delay, concatMap } from"rxjs/operators";
import { Injectable } from'@angular/core';

@Injectable()
export class FirstService {
    firstList: Array<number> = [ 1, 2, 3, 4, 5 ]

    getAllNumbers(): Observable<Array<number>> {
        return of(this.firstList).pipe(delay(1000));
    }
}
