import { NgModule } from '@angular/core';
import { NgCdkTooltipComponent } from './tooltip.component';
import { NgCdkTooltipTriggerForDirective } from './tooltip-trigger-for.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    OverlayModule,
    ReactiveFormsModule
  ],
  declarations: [NgCdkTooltipComponent, NgCdkTooltipTriggerForDirective
],
  exports: [NgCdkTooltipComponent, NgCdkTooltipTriggerForDirective]
})
export class NgCdkTooltipModule {}
