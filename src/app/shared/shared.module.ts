import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// MATERIAL
import { MaterialModule } from './material.module';

// FLEX LAYOUT
import { FlexLayoutModule } from '@angular/flex-layout';

// HIGH CHART
import { HighchartsChartModule } from 'highcharts-angular';

// LOTTIE
import { LottieModule } from 'ngx-lottie';
export function playerFactory(): Promise<any> {
  return import('lottie-web');
}

// WIDGET
import { PieComponent } from './widgets/pie/pie.component';
import { AreaComponent } from './widgets/area/area.component';
import { CardComponent } from './widgets/card/card.component';

// COMPONENT
import { DeleteModule } from './components/delete/delete.module';
import { LoadingComponent } from './components/loading/loading.component';
import { InputFormModule } from './components/input-form/input-form.module';

@NgModule({
  declarations: [
    PieComponent,
    AreaComponent,
    CardComponent,
    LoadingComponent,
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    DeleteModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    LottieModule.forRoot({player: playerFactory, useCache: true})
  ],
  exports: [
    DeleteModule,
    PieComponent,
    AreaComponent,
    CardComponent,
    MaterialModule,
    InputFormModule,
    FlexLayoutModule,
  ]
})
export class SharedModule { }
