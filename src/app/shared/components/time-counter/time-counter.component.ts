import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject, interval, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-time-counter',
  templateUrl: './time-counter.component.html',
  styleUrls: ['./time-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeCounterComponent implements OnInit, OnDestroy {
  @Input() totalMs!: number | null;
  @Input() initialMs!: number | null;
  @Output() stopChange = new EventEmitter<number>();
  @Output() runningChange = new EventEmitter<boolean>();

  running$ = new BehaviorSubject<boolean>(false);
  progress$ = new BehaviorSubject<number>(0);
  currentMs$ = new BehaviorSubject<number>(0);
  color$ = new BehaviorSubject<'primary' | 'accent'>('primary');
  private stopSignal$ = new Subject<void>();
  private onDestroy$ = new Subject<void>();

  constructor() {
    this.running$.pipe(
      takeUntil(this.onDestroy$),
      tap((running) => this.runningChange.emit(running)),
    ).subscribe();
    this.progress$.pipe(
      takeUntil(this.onDestroy$),
      tap((progress) => this.color$.next(progress < 80 ? 'primary' : 'accent')),
      tap((progress) => {
        if (progress >= 100) {
          this.stopTimer();
        }
      }),
    ).subscribe();
    this.currentMs$.pipe(
      takeUntil(this.onDestroy$),
      tap((currentMs) => this.progress$.next(this.calculateProgress(currentMs, this.totalMs || 0))),
    ).subscribe();
    this.stopSignal$.pipe(
      takeUntil(this.onDestroy$),
      tap(() => this.stopChange.emit(this.currentMs$.value)),
    ).subscribe();
  }

  ngOnInit() {
    this.currentMs$.next(this.initialMs || 0);
  }

  calculateProgress(currentMs: number, totalMs: number): number {
    return (100 * currentMs) / totalMs;
  }

  startTimer() {
    this.running$.next(true);
    interval(1000).pipe(
      takeUntil(this.onDestroy$),
      takeUntil(this.stopSignal$),
      tap(() => this.currentMs$.next(this.currentMs$.value + 1000)),
    ).subscribe();
  }

  stopTimer() {
    this.running$.next(false);
    this.stopSignal$.next();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
