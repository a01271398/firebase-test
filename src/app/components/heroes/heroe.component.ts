import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe: Heroe = {
    nombre: '',
    bio: '',
    casa: 'Marvel'
  };

  nuevo: boolean;
  id: string;

  constructor(private _heroesService: HeroesService, private _router: Router,
    private _activatedRoute: ActivatedRoute) {
      this._activatedRoute.params.subscribe( params => {
        this.id = params['id'];
        if ( this.id !== 'new') {
          this._heroesService.getHeroe( this.id )
          .subscribe( (heroe: any) => this.heroe = heroe);
        }
      });
     }

  guardar() {
    if ( this.id === 'new' ) {
      // Creando nuevo heroe
      this._heroesService.nuevoHeroe(this.heroe)
      .subscribe ( res => {
        console.log(res);
        this._router.navigate(['/heroe', res.name]);
      });
    } else {
      // actualizando
      this._heroesService.actualizarHeroe(this.heroe, this.id)
      .subscribe ( res => {
        console.log(res);
      });
    }

  }
  agregarHeroe(forma: NgForm) {
    console.log(forma);
    this._router.navigate(['/heroe', 'new']);
    forma.reset({
      casa: 'Marvel'
    });
  }

  ngOnInit() {
  }

}
