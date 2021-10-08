import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateComponent } from './components/translate/translate.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { SearchLanguagePipe } from './shared/pipes/search-language.pipe';
import {CopyClipboardDirective} from "./shared/directives/CopyClipboardDirective";
import {NotifierModule} from "angular-notifier";

@NgModule({
  declarations: [
    AppComponent,
    TranslateComponent,
    SearchLanguagePipe,
    CopyClipboardDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
        },
      },
      behaviour: {
        autoHide: 1000,
      },
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [CopyClipboardDirective],
})
export class AppModule { }
