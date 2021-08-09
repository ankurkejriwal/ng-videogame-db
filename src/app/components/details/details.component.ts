import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {


  // [max] = "100"
  //                       [dialStartAngle] = "180"
  //                       [dialEndAngle] = "0"
  //                       value = "gameRating"

  gameRating:number = 0;
  gameID: string = "";
  game! : Game;
  routeSub: Subscription = new Subscription();
  gameSub: Subscription = new Subscription();

  

  constructor(private activatedRoute: ActivatedRoute,private httpService: HttpService) { }

  
  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params)=>{
      this.gameID = params['id'];
      this.getGameDetails(this.gameID);
    });
  }
  getGameDetails(gameID: string):void {
    this.gameSub = this.httpService.getGameDetails(gameID).subscribe((gameResp: Game) => {
      this.game = gameResp;
      console.log(gameResp);

      setTimeout(() =>{
        this.gameRating = this.game.metacritic;

      },1000);
    })
  }

  getColor(value: number): string{
    if(value >75){
      return '#5ee432';
    } else if(value >50){
      return '#fffa50';
    }else if(value > 30){
      return '#f7aa3';
    }else{
      return '#ef4655';
    }

  }

}
