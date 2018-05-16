import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  ViewContainerRef,
  ChangeDetectorRef
} from "@angular/core";
import { NgCdkTooltipComponent } from "./tooltip.component";
import {
  OverlayRef,
  Overlay,
  OverlayConfig,
  ConnectedPositionStrategy,
  ConnectionPositionPair
} from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import { EventManager } from "@angular/platform-browser";

export declare type TooltipDirection = "left" | "top" | "right" | "bottom";
export declare type TooltipTriggerType = "click" | "hover";
export declare type TooltipTriggerScrollStrategy = "close" | "reposition";

let nextId = 0;

/**
 * This directive will be placed in any element to open a tooltipComponent.
 * It will create a overlay with the tooltip and attach it to the element.
 */
@Directive({
  selector: "[ngCdkTooltipTriggerFor]",
  exportAs: "ngCdkTooltipTrigger",
  host: {
    "(click)": "openTooltip()",
    "aria-haspopup": "true",
    "[attr.aria-expanded]": "visible",
    "[attr.aria-describedby]": "id"
  }
})
export class NgCdkTooltipTriggerForDirective implements AfterViewInit, OnDestroy {
  private overlayRef: OverlayRef;
  private portal: TemplatePortal<any>;
  private destroyed: boolean = false;

  id = "ng-cdk-tooltip-" + nextId++;

  @Input("ngCdkTooltipTriggerFor") tooltip: NgCdkTooltipComponent;

  // Could be 'left' | 'top' | 'right' | 'bottom'.
  // The CDK Overlay will find the best position if the default is not possible
  @Input("ngCdkTooltipDirection") direction: TooltipDirection = "right";

  @Input("ngCdkTooltipInitialVisible") tooltipInitialVisible: boolean = false;

  // 'click' | 'hover'
  @Input("ngCdkTooltipTrigger") trigger: TooltipTriggerType = "hover";

  // 'close' | 'reposition'
  @Input("ngCdkTooltipScrollStrategy")
  scrollStrategy: TooltipTriggerScrollStrategy = "close";

  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private eventManager: EventManager,
    private change: ChangeDetectorRef
  ) {}

  @HostListener("mouseenter")
  @HostListener("focus")
  onMouseEnter() {
    if (this.trigger === "hover") {
      this.openTooltip();
    }
  }

  @HostListener("mouseout")
  @HostListener("touchstart")
  @HostListener("focusout")
  onMouseExit() {
    if (this.trigger === "hover") {
      this.closeTooltip();
    }
  }

  ngAfterViewInit(): void {
    this.tooltip.id = this.id;

    this.eventManager.addGlobalEventListener("window", "keyup.esc", () => {
      this.tooltip.closeTooltip();
    });

    this.tooltip.closed.subscribe(() => {
      this.closeTooltip();
    });

    if (this.tooltipInitialVisible) {
      this.openTooltip();
    }

    this.tooltip.showCloseButton = this.trigger === "click";
  }

  ngOnDestroy(): void {
    this.destroyed = true;
  }

  private openTooltip(): void {
    if (!this.createOverlay().hasAttached()) {
      this.createOverlay().attach(this.portal);
    }
  }

  private closeTooltip(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }

  private createOverlay(): OverlayRef {
    if (!this.overlayRef) {
      // A template Portal is a reference to the ng-template placed in the template
      this.portal = new TemplatePortal(
        this.tooltip.templateRef,
        this.viewContainerRef
      );
      // Each OverlayCDK has a default conf but we want to override it
      const overlayState = new OverlayConfig();

      // Get the Connected position stategy (There are other positions strategies like in the middle of the screen for modals)
      overlayState.positionStrategy = this.getPosition();

      if (this.scrollStrategy === "reposition") {
        overlayState.scrollStrategy = this.overlay.scrollStrategies.reposition();
      } else {
        overlayState.scrollStrategy = this.overlay.scrollStrategies.close();
      }
      overlayState.scrollStrategy.enable();

      // Backdrop is for dettach the overlay on backdrop click
      if (this.trigger === "click") {
        overlayState.hasBackdrop = true;
      }

      this.overlayRef = this.overlay.create(overlayState);
    }

    return this.overlayRef;
  }

  private getPosition(): ConnectedPositionStrategy {
    // The tooltip will try to be placed in the position given.
    // But it has a FallbackStrategy to avoid tooltips outside of screen and that type of issues
    if (this.direction === "right") {
      const strategy = this.overlay
        .position()
        .connectedTo(
          this.elementRef,
          { originX: "end", originY: "center" },
          { overlayX: "start", overlayY: "center" }
        )
        .withOffsetX(20)
        .withOffsetY(0);

      return this.withFallbackStrategy(strategy);
    } else if (this.direction === "bottom") {
      const strategy = this.overlay
        .position()
        .connectedTo(
          this.elementRef,
          { originX: "center", originY: "bottom" },
          { overlayX: "center", overlayY: "top" }
        )
        .withOffsetX(0)
        .withOffsetY(20);

      return this.withFallbackStrategy(strategy);
    } else if (this.direction === "top") {
      const strategy = this.overlay
        .position()
        .connectedTo(
          this.elementRef,
          { originX: "center", originY: "top" },
          { overlayX: "center", overlayY: "bottom" }
        )
        .withOffsetX(0)
        .withOffsetY(-20);

      return this.withFallbackStrategy(strategy);
    } else if (this.direction === "left") {
      const strategy = this.overlay
        .position()
        .connectedTo(
          this.elementRef,
          { originX: "start", originY: "center" },
          { overlayX: "end", overlayY: "center" }
        )
        .withOffsetX(-20)
        .withOffsetY(0);

      return this.withFallbackStrategy(strategy);
    }
  }
  private withFallbackStrategy(
    strategy: ConnectedPositionStrategy
  ): ConnectedPositionStrategy {
    strategy
      .withFallbackPosition(
        { originX: "center", originY: "bottom" },
        { overlayX: "center", overlayY: "top" },
        0,
        20
      )
      .withFallbackPosition(
        { originX: "end", originY: "bottom" },
        { overlayX: "end", overlayY: "top" },
        0,
        20
      )
      .withFallbackPosition(
        { originX: "end", originY: "center" },
        { overlayX: "start", overlayY: "center" },
        20,
        0
      )
      .withFallbackPosition(
        { originX: "start", originY: "center" },
        { overlayX: "end", overlayY: "center" },
        -20,
        0
      )
      .withFallbackPosition(
        { originX: "center", originY: "top" },
        { overlayX: "center", overlayY: "bottom" },
        0,
        -20
      )
      .withFallbackPosition(
        { originX: "start", originY: "bottom" },
        { overlayX: "start", overlayY: "top" },
        0,
        20
      )
      .withFallbackPosition(
        { originX: "start", originY: "top" },
        { overlayX: "start", overlayY: "bottom" },
        0,
        -20
      )
      .withFallbackPosition(
        { originX: "end", originY: "top" },
        { overlayX: "end", overlayY: "bottom" },
        0,
        -20
      );

    return strategy;
  }
}
