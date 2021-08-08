import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public sort: string = '';
  public games : Array<Game> = new Array<Game>();

  private routeSub: Subscription = new Subscription;
  private gameSub: Subscription = new Subscription;

  

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) =>{
      if (params['game-search']){
        this.searchGames('metacrit',params['game-search']);
      } else{
        this.searchGames('metacrit');
      }
    }
    
    
    );
  }
  searchGames(sort: string, search?: string): void {
    this.gameSub = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      });
  }

  openGameDetails(id:string): void{
    // this.router.navigate(['details',id]);
    console.log(id);
  }

}
