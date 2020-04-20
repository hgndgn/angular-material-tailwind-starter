import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { MatButtonModule } from "@angular/material/button";
import { NgModule } from "@angular/core";

const MAT_MODULES = [MatButtonModule];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, ...MAT_MODULES],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
