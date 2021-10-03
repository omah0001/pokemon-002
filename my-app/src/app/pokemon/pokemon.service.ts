import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { combineLatest, forkJoin, Observable, of, zip, from, interval} from "rxjs";
import { mergeMap, delay, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private http: HttpClient) {

  }

  getPokemonData$(limit) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`);
  }

  getPokemonListData$(url) {
    return this.http.get(url);
  }
}
