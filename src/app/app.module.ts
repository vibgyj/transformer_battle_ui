import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatButtonModule, MatListModule, MatToolbarModule, MatTabsModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatGridListModule, MatProgressBarModule, MatIconModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransformersListComponent } from './transformers-list/transformers-list.component';
import { TransformerEditComponent } from './transformer-edit/transformer-edit.component';
import { environment } from 'src/environments/environment';
import { RunSimulationComponent } from './run-simulation/run-simulation.component';
import { FormsModule } from '@angular/forms';
import { AlertPopupComponent } from './alert-popup/alert-popup.component';
import { HttpClientModule } from '@angular/common/http';
import { UtilService } from './services/UtilService';

@NgModule({
  declarations: [
    AppComponent,
    TransformersListComponent,
    TransformerEditComponent,
    RunSimulationComponent,
    AlertPopupComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, MatListModule, MatDialogModule, MatToolbarModule, MatTabsModule,
    MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, FormsModule,
    MatGridListModule, MatProgressBarModule, MatIconModule,
    DragDropModule
  ],
  entryComponents: [AlertPopupComponent],
  providers: [{ provide: 'ITransformerService', useClass: environment.transformerService }, UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
