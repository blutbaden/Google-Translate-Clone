import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from "../../shared/services/translate.service";
import {languagesCodes} from "../../shared/data/languagesCodes";
import {fromEvent, throwError} from "rxjs";
import {debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit, AfterViewInit {

  sourceLanguage: { code: string; name?: string; nativeName?: string; } | undefined;
  destinationLanguage: { code: string, name?: string, nativeName?: string } | undefined;
  translatedText: string | undefined;
  languageToSearch: string | undefined;

  isLoading: boolean = false;
  isSelectLanguageBtnClicked: boolean = false;
  isSelectSourceBtnClicked: boolean = false;
  isError: boolean = false;

  languagesCodes: { code: string, name: string, nativeName: string }[] = languagesCodes;

  @ViewChild('textToTranslateInput') input: ElementRef | undefined

  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    fromEvent<any>(this.input?.nativeElement, 'keyup').pipe(
      map(event => event.target.value),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(textToTranslate => {
        return this.getTranslation(textToTranslate)
      })
    )
      .subscribe(
        value => this.translatedText = value,
        error => {
          this.isError = true;
          throwError(error);
        },
        () => this.isLoading = false
      );
  }

  getTranslation(textToTranslate: string) {
    this.isLoading = true;
    return this.translateService.translate_v2("en", "fr", textToTranslate)
      .pipe(
        map(res => {
          console.log(res)
          return ""
        })
      );
  }

  selectLanguage(language: { code: string, name: string, nativeName: string }) {
    this.isSelectSourceBtnClicked ? this.sourceLanguage = language : this.destinationLanguage = language;
    this.isSelectLanguageBtnClicked = false;
    this.languageToSearch = ""
  }

  getLanguages(isSelectSourceBtnClicked: boolean) {
    this.isSelectLanguageBtnClicked = !this.isSelectLanguageBtnClicked;
    this.isSelectSourceBtnClicked = isSelectSourceBtnClicked;
    this.languageToSearch = "";
  }

  isSelectedLanguage(languageCode: string) {
    return this.isSelectSourceBtnClicked ? languageCode === this.sourceLanguage?.code :
      languageCode === this.destinationLanguage?.code;
  }
}
