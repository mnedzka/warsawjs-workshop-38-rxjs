import { Component } from '@angular/core';
import { of, interval, fromEvent, merge, pipe, BehaviorSubject } from 'rxjs';
import { map, filter, throttleTime, take, takeUntil, takeWhile } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { parse, stringify } from "query-string";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  customOperator() {
    throw new Error("Method not implemented.");
  }
  higherOrder() {
    throw new Error("Method not implemented.");
  }
  hotvscold() {
    throw new Error("Method not implemented.");
  }
  operatorsCombination() {
    const mouseEv$ = fromEvent(document, 'mousemove')
      .pipe(
        map(({ clientX, clientY }: MouseEvent) => ({ clientX, clientY })),
        throttleTime(1000),
      )
    const clickEv$ = fromEvent(document, 'click')
      .pipe(
        map(({ type }: MouseEvent) => ({ type }))
      )

    merge(
      mouseEv$,
      clickEv$,
    ).subscribe(console.log)
  }
  operatorsTransformation() {
    throw new Error("Method not implemented.");
  }
  operatorsFiltering() {
    interval(1000)
      .pipe(
        take(5),
        takeWhile((val) => val < 5),
        takeUntil(fromEvent(document, 'click'))
      )
      .subscribe(console.log, null, () => console.log('complete'))
  }
  subjects() {
    const filters = new BehaviorSubject({
      currentPage: 1,
      itemsPerPage: 5,
    })

    filters.subscribe((val) => {
      const params = stringify(val);
      ajax(`https://api.debugger.pl/items?${params}`)
        .pipe((resp) => resp)
        .subscribe(console.log)
    }
    )

    fromEvent(document, 'click')
      .subscribe(() => {
        filters.next({ ...filters.value, itemsPerPage: Math.ceil(Math.random() * 10) })
      })
  }
  observables() {
    interval(1000)
      .pipe(
        map((val) => 1000 + val),
        filter((val) => val % 2 === 0)
      )
    // .subscribe(
    //   console.log,
    //   null,
    //   () => console.log('complete')
    // )
    fromEvent(document, 'mousemove')
      .pipe(
        map(({ clientX, clientY }: MouseEvent) => ({ clientX, clientY })),
        throttleTime(1000),
      )
      .subscribe(console.log)
  }
  observableAndObserver() {
    of('hello')
      .subscribe(
        console.log,
        console.error,
        () => {
          console.log('complete');
        }
      )
  }
  title = 'erixy';

  constructor() {
    // this.observableAndObserver();
    // this.observables();
    this.subjects();
    // this.operatorsFiltering();
    // this.operatorsTransformation();
    // this.operatorsCombination();
    // this.hotvscold();
    // this.higherOrder()
    // this.customOperator();
  }
}
