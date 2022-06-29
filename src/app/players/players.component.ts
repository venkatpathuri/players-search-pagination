import { Component, OnInit } from '@angular/core';
import { FeaturesService } from '../features.service';
import { Players } from '../players.modal';

import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  playerinfo: any = [];
  p: number = 1;
  searchText: any;
  signUpForm!: FormGroup;
  addbtn: boolean = true
  playerObj: Players = new Players

  constructor(private player: FeaturesService) {

  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({

      id: new FormControl(null),
      playername: new FormControl(null),
      team: new FormControl(null)

    });
    this.players();
  }


  players() {
    this.player.getPlayer().subscribe((res: any) => {
      this.playerinfo = res;
    })
  }
  searchPlayer() {
    if (this.searchText === "") {
      this.ngOnInit();
    }
    this.playerinfo = this.playerinfo.filter((v: any, i: any) => {
      return v.playername.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase())
    })
  }

  submitForm() {
    this.playerObj.id = this.signUpForm.value.id;
    this.playerObj.playername = this.signUpForm.value.playername
    this.playerObj.team = this.signUpForm.value.team

    this.player.postPlayer(this.playerObj).subscribe((res) => {
      alert('Player added successfullt');
      this.players();
      this.signUpForm.reset();
      return res;

    })


  }

  deletePlayers(player: any) {
    this.player.deletePlayer(player.id).subscribe(res => {
      console.log(res);
      this.players();
    })
  }

  editPlayer(player: any) {
    this.playerObj.id = this.signUpForm.value.id
    this.signUpForm.controls['id'].setValue(player.id);
    this.signUpForm.controls['playername'].setValue(player.playername);
    this.signUpForm.controls['team'].setValue(player.team);
    this.addbtn = false
  }
  updatePlayer() {
    this.playerObj.id = this.signUpForm.value.id
    this.playerObj.playername = this.signUpForm.value.playername
    this.playerObj.team = this.signUpForm.value.team
    this.player.updatePlayer(this.playerObj, this.playerObj.id).subscribe(res => {
      this.players();
      this.addbtn=true
      this.signUpForm.reset();
      return res;
    })
  }


}
