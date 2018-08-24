import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { PlayerList } from '../_models/PlayerList';
import { AlertifyService } from '../_services/alertify.service';
import { Team } from '../_models/Team';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  players: PlayerList[];
  teams: Team[];
  playersInTeam: PlayerList[];

  constructor(
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.loadPlayers();
    this.loadTeams();
  }

  loadPlayers() {
    this.userService.getPlayers().subscribe(
      (players: PlayerList[]) => {
        this.players = players;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  loadTeams() {
    this.userService.getTeams().subscribe(
      (teams: Team[]) => {
        this.teams = teams;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
}
