import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: any[];
  loading = true;

  constructor(private _heroesService: HeroesService) {
    _heroesService.getHeroes()
    .subscribe( (data: any) => {
      this.heroes = data;
      console.log(data);
      this.loading = false;
    });
  }

  borrarHeroe(k$: string) {
    this._heroesService.borrarHeroe(k$)
    .subscribe( res => {
      if ( res ) {
        console.error(res);
      } else {
        delete this.heroes[k$];
      }
    })
  }

  ngOnInit() {
  }

}
