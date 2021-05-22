import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tube-shuffle',
  templateUrl: './tube-shuffle.component.html',
  styleUrls: ['./tube-shuffle.component.scss'],
})
export class TubeShuffleComponent implements OnInit {
  shuffleNoneVisible: boolean;
  shuffleVisible: boolean;

  @Output() shuffle = new EventEmitter();
  @Output() none = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.setLinkVisible(true, false);
  }

  doShuffle() {
    this.setLinkVisible(false, true);
    this.shuffle.emit();
  }

  doShuffleNone() {
    this.setLinkVisible(true, false);
    this.none.emit();
  }

  setLinkVisible(noneVisible: boolean, shuffleVisible: boolean) {
    this.shuffleNoneVisible = noneVisible;
    this.shuffleVisible = shuffleVisible;
  }
}
