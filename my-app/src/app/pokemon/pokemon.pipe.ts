import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'pokemonFilter'
})
export class PokemonPipe implements PipeTransform {
  transform(pokemonData: any, ...args: any[]): any[] {
    console.log(pokemonData);
    return args[0] ? pokemonData.filter(pokemon => pokemon.value.name.includes(args[0])) : pokemonData;
  }
}