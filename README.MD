# ng-cdk-tooltip

## Installation

To install this library, run:

```bash
$ npm install ng-cdk-tooltip --save
```

## Demo
[https://stackblitz.com/edit/ng-cdk-tooltip-demo]
## Set up for the tooltip

https://samuanv.github.io/ng-cdk-tooltip/

You need import the NgCdkTooltipModule in your Angular modules:

```typescript
import { NgCdkTooltipModule }  from 'ng-cdk-tooltip';

```

IMPORTANT!: If you are using Angular Material (@angular/material) in your app and you are using a prebuild theme like:
```scss
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
```
the tooltip will work correctly. Otherwise you need to add this line to your style.css:
```scss
@import "~@angular/cdk/overlay-prebuilt.css";
```


## Using the tooltip
#### Trigger types
It is possible to open the popover by hover or click event. You can adjust the trigger type by setting the stTooltipTrigger attribute to click/hover.

Hover: The popover triggered by hover will close immediately after the mouse exits the trigger. In hover mode, focus on the Trigger element will display the tooltip. Focusout will hide it.

Click: The popover triggered by click will stay open until the user explicitly closes the the popover.

```xml
<button [ngCdkTooltipTriggerFor]="tooltipRef" ngCdkTooltipTrigger="click">
  Click
</button>

<ng-cdk-tooltip #tooltipRef>
  Trigger by click
</ng-cdk-tooltip>
```
#### Positioning
It is possible to position the tooltip top/right/bottom/left to the trigger by setting the stTooltipDirection attribute to top/right/bottom/left.
```xml      
<button [ngCdkTooltipTriggerFor]="tooltipRef"
        ngCdkTooltipPosition="right">
  Hover
</button>

<ng-cdk-tooltip #tooltipRef>
  Trigger on right
</ng-cdk-tooltip>
```
#### Fallback strategy
The positioning of the popover follows a fallback strategy to make sure, that the component displayed correctly in the most common situations. Fallback means, that the popover tries to find a fitting position within the window.
#### Initial visible
Is possible to show the tooltip visible at first:
```xml      
<button [ngCdkTooltipTriggerFor]="tooltipRef"
        [ngCdkTooltipInitialVisible]="true">
  Hover
</button>

<ng-cdk-tooltip #tooltipRef>
  Initial visible
</ng-cdk-tooltip>```
#### Scroll strategy
The popover implements the two strategies close/reposition to handle the behaviour of the popover when the owning container scrolls.
The strategy close will automatically closes the popover, while reposition scrolls the popover with its origin.
```xml      
<button [ngCdkTooltipTriggerFor]="tooltipRef"
        ngCdkPopoverScrollStrategy="close">
        Click
</button>

<ng-cdk-tooltip #tooltipRef>
  Trigger close scroll
</ng-cdk-tooltip>```
#### Closed event
Is possible to subscribe to a closed event.
```xml      
<button [ngCdkTooltipTriggerFor]="tooltipRef">
  Click
</button>

<ng-cdk-tooltip (ngCdkClosed)="onClosed()" #tooltipRef>
  Subscribe to close
</ng-cdk-tooltip>```
## License
MIT © [Samuel Andreo](mailto:samuanv@gmail.com)
