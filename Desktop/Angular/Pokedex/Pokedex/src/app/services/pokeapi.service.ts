import { Injectable, ɵisListLikeIterable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**Interface para informar ao Angular a resposta que virá da requisição GET
 * Usamos então o Generics PokeListResponse para tipar a nossa requisição */  

 interface PokeListResponse{
  count: number,
  next: string,
  previous: string,
  results: any[],
  uri: string
 }

@Injectable({
  providedIn: 'root'
})

export class PokeapiService {
  private url = '//pokeapi.co/api/v2/pokemon/';
  pokeList = [];

  //Injetar o HttpClient
  constructor(
    private http: HttpClient
  ) { }

  //Criação do método que irá fazer a requisição GET
  listAll(){
    this.http.get<PokeListResponse>(`${this.url}`) //String Format (acessar um js dentro de uma string, só funciona com crase)
      .subscribe(
        response => {
          response.results.forEach(results => {
            results.number = this.getNumberFromUrl(results.uri);
            console.log(response.results);
          })
          this.pokeList = this.sortPokemon(response.results)
          .filter(results => results.number < 1000)
          console.log(response.results);
          
        })
  }

  //Função que pega apenas o número proveniente da URL de cada pokemon
  private getNumberFromUrl(url = 'https://pokeapi.co/api/v2/pokemon/1/') {
    return parseInt(url.replace(/.*\/(\d+)\/$/, '$1'));
  }
  
  //Função que ordena a string de pokemons
  private sortPokemon(pokemonList) {
    return pokemonList.sort((a, b) => {
      return (a.number > b.number ? 1 : -1);
    })
  }
}



