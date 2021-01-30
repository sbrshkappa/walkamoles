import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval} from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css']
})
export class CountDownComponent implements OnInit {

  private subscription: Subscription;

  public dateNow = Date();
  public dDay = new Date('Nov 23 2021 22:00:00');
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAHour = 60;
  secondsInAMinute = 60;

  public timeDifference;
  public secondsToDday;
  public minutesToDday;
  public hoursToDday;
  public daysToDday;

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.secondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAHour) % this.secondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAHour * this.secondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAHour * this.secondsInAMinute * this.hoursInADay));
  }

  constructor() { }

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe(x => {this.getTimeDifference();});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
