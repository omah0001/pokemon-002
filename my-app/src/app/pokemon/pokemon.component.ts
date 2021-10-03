import { Component, OnInit } from '@angular/core';
import { PokemonService } from './pokemon.service';
import {DomSanitizer} from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  title = 'my-app';
  pokemonData: any = {};
  pokemonListData: any = {};
  length = 20;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  pokemonListDataCopy: any = {};
  pokemonName = '';

  constructor(private pokemonService: PokemonService,
    private domSanitizer : DomSanitizer) {

  }

  ngOnInit() {
    this.pokemonService.getPokemonData$(length).
    subscribe(response => {
      this.pokemonData = response;
      this.getPokemonDetails(0, 5);
    });
  }

  getPokemonDetails(startIndex, endIndex) {
    console.log(startIndex, endIndex);
    const pokemonDataCopy = this.pokemonData.results.slice(startIndex, endIndex);
    pokemonDataCopy.forEach(pokemon => {
      this.pokemonListData = {};
      this.pokemonService.getPokemonListData$(pokemon.url).subscribe(pokemonDetails => {
        this.pokemonListData[pokemonDetails['id']] = pokemonDetails;
          console.log(this.pokemonListData);
      });
    })
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    console.log(event);
    this.getPokemonDetails(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
  }


  getObjectData(arrayData) {
    return arrayData.reduce((prev,curr) => {
      prev[curr[0]]=curr[1];
      return prev;
    },{})};
}
