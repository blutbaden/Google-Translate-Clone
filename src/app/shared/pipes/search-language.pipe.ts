import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchLanguage'
})
export class SearchLanguagePipe implements PipeTransform {

  transform(languages: any, searchText: any): any {
    if(searchText == null) return languages;

    return languages.filter(function(language: {code: string, name: string, nativeName: string}){
      return language.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }

}
