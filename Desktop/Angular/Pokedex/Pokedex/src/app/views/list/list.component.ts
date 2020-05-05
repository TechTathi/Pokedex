import { Component, OnInit } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  //Injetar o PokeAPI service
  constructor(
    private pokeapi: PokeapiService
  ) { }

  
  nameFilter = '';
  selectedPkm = null;
  //pokemonList = 
  get pokemonList() {
    return this.pokeapi.pokeList.filter(pokemon =>{
      return pokemon.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) !== -1;
    })
  }

  get pkmSprite(){
    const numberPokemon = ('000' + this.selectedPkm.number).slice(-3);
    return '//serebii.net/sunmoon/pokemon/001.png'
  }

//É executado sempre que um componente é iniciado
  ngOnInit(): void {
    this.pokeapi.listAll();
  }

  selectPokemon(pkm) {
    this.selectedPkm = pkm;
  }
}
