import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    
    searchText = searchText.toLowerCase();
    
    let filtered: any[] = [];

    items.forEach(element => {
      let name: string = element.countryName.toLowerCase();
      if (name.includes(searchText))
        filtered.push(element);
    });

    return filtered;
  }

}
