import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatButtonModule, MatListModule, MatToolbarModule, MatTabsModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatGridListModule, MatProgressBarModule, MatIconModule, MatTooltipModule, MatCardModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransformersListComponent } from './transformers-list/transformers-list.component';
import { TransformerEditComponent } from './transformer-edit/transformer-edit.component';
import { environment } from 'src/environments/environment';
import { RunSimulationComponent } from './run-simulation/run-simulation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertPopupComponent } from './alert-popup/alert-popup.component';
import { HttpClientModule } from '@angular/common/http';
import { UtilService } from './services/UtilService';
import { SkillsDisplayComponent } from './skills-display/skills-display.component';

@NgModule({
  declarations: [
    AppComponent,
    TransformersListComponent,
    TransformerEditComponent,
    RunSimulationComponent,
    AlertPopupComponent,
    SkillsDisplayComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, MatListModule, MatDialogModule, MatToolbarModule, MatTabsModule,
    MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, FormsModule,
    ReactiveFormsModule, MatCardModule,
    MatGridListModule, MatProgressBarModule, MatIconModule, MatTooltipModule,
    DragDropModule
  ],
  entryComponents: [AlertPopupComponent],
  providers: [{ provide: 'ITransformerService', useClass: environment.transformerService }, UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
