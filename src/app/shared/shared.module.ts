import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MaterialModule } from './material.module';

// MASK
import { NgxMaskModule } from 'ngx-mask';

// FLEX LAYOUT
import { FlexLayoutModule } from '@angular/flex-layout';

// HIGH CHART
import { HighchartsChartModule } from 'highcharts-angular';

// WIDGET
import { PieComponent } from './widgets/pie/pie.component';
import { AreaComponent } from './widgets/area/area.component';
import { CardComponent } from './widgets/card/card.component';

// COMPONENT
import { InputFormModule } from './components/input-form/input-form.module';

@NgModule({
  declarations: [
    PieComponent,
    AreaComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    NgxMaskModule,
    MaterialModule,
    FlexLayoutModule,
    HighchartsChartModule
  ],
  exports: [
    PieComponent,
    NgxMaskModule,
    AreaComponent,
    CardComponent,
    MaterialModule,
    InputFormModule,
    FlexLayoutModule,
  ]
})
export class SharedModule { }
