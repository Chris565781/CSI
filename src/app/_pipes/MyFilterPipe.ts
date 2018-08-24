import { Pipe, PipeTransform } from '@angular/core';
import { Team } from '../_models/Team';
import { PlayerList } from '../_models/PlayerList';

@Pipe({
  name: 'myfilter',
  pure: false
})
export class MyFilterPipe implements PipeTransform {
  transform(items: PlayerList[], team: Team): any {
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    console.log(items);
    console.log(team.id);
    // tslint:disable-next-line:triple-equals
    return items.filter(item => item.teamId == team.id);
  }
}
