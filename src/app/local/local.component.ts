import { PlayListItem } from './../core/models/PlayList';
import { Component, OnInit } from '@angular/core';
import { UserDataService } from './../core/services/user-data.service';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss'],
})
export class LocalComponent implements OnInit {
  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {}

  delete(item: PlayListItem) {}
}
