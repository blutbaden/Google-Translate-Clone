import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from "../../shared/services/translate.service";
import {languagesCodes} from "../../shared/data/languagesCodes";
import {EMPTY, fromEvent, throwError} from "rxjs";
import {debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {NotifierService} from "angular-notifier";

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
  errorMessage: string | undefined;

  languagesCodes: { code: string, name: string, nativeName: string }[] = languagesCodes;

  private readonly notifier: NotifierService;

  @ViewChild('textToTranslateInput') input: ElementRef | undefined

  constructor(private translateService: TranslateService, notifierService: NotifierService) {
    this.notifier = notifierService;
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
          const {status} = error;
          if(status === 400){
            this.errorMessage = "Sorry, this language is not supported!";
          }else {
            this.errorMessage = "An error has occurred ! Please retry later.";
          }
          throwError(error);
        },
        () => this.isLoading = false
      );
  }

  getTranslation(textToTranslate: string) {
    if(this.checkBeforeTranslate(textToTranslate)){
      this.isLoading = true;
      return this.translateService.translate(this.sourceLanguage?.code || "", this.destinationLanguage?.code || "", textToTranslate)
        .pipe(
          map(res => {
            const {translations} = res.data;
            return translations[0].translatedText;
          })
        );
    }
    return EMPTY
  }

  checkBeforeTranslate(textToTranslate: string) {
    return this.sourceLanguage && this.destinationLanguage && textToTranslate && textToTranslate.trim() !== "";
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

  public notify(payload: string) {
    this.notifier.notify('default', 'Copied to clipboard!');
  }

  reload() {
    location.reload();
  }
}
