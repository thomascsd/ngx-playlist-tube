import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tube-repeat',
  templateUrl: './tube-repeat.component.html',
  styleUrls: ['./tube-repeat.component.scss'],
})
export class TubeRepeatComponent implements OnInit {
  noneVisible: boolean;
  repeatVisible: boolean;
  repeatOneVisible: boolean;

  @Output() repeat = new EventEmitter();
  @Output() one = new EventEmitter();
  @Output() none = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.setLinkVisible(true, false, false);
  }

  doRepeat() {
    this.setLinkVisible(false, true, false);
    this.repeat.emit();
  }

  doRepeatOne() {
    this.setLinkVisible(false, false, true);
    this.one.emit();
  }

  doRepeatNone() {
    this.setLinkVisible(true, false, false);
    this.none.emit();
  }

  setLinkVisible(noneVisible: boolean, repeatVisible: boolean, repeatOneVisible: boolean) {
    this.noneVisible = noneVisible;
    this.repeatVisible = repeatVisible;
    this.repeatOneVisible = repeatOneVisible;
  }
}
