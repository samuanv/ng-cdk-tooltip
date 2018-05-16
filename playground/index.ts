/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NgCdkTooltipModule }  from 'ng-cdk-tooltip';

@Component({
  selector: 'app',
  template: `
  <br>
<br><br>
<br><br>
<br><br>
<br><br>
<br><button [ngCdkTooltipTriggerFor]="tooltipRef"
  ngCdkTooltipPosition="right"
  ngCdkTooltipTrigger="click">Hover
</button>
<br>
<br>
<br>
<ng-cdk-tooltip #tooltipRef>
Trigger on right
</ng-cdk-tooltip>`,
styles: [`.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;
  top:0;left:0;height:100%;width:100%}
  .cdk-overlay-container{position:fixed;z-index:1000}
  .cdk-overlay-container:empty{display:none}
  .cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}
  .cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}
  .cdk-overlay-backdrop{position:absolute;
    top:0;bottom:0;left:0;right:0;
    z-index:1000;pointer-events:auto;
    -webkit-tap-highlight-color:transparent;
    transition:opacity .4s cubic-bezier(.25,.8,.25,1);
    opacity:0}
    .cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:1}
    .cdk-overlay-dark-backdrop{background:rgba(0,0,0,.288)}
    .cdk-overlay-transparent-backdrop,.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing{opacity:0}
  .cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}`
]})
class AppComponent {}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, NgCdkTooltipModule ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
