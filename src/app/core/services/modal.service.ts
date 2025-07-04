import { Injectable, Injector, TemplateRef, ComponentRef, EmbeddedViewRef } from '@angular/core';
import { Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private overlayRefs: OverlayRef[] = [];

  constructor(private overlay: Overlay, private injector: Injector) {}

  openWithTemplate(template: TemplateRef<any>, context: any = {}, positionStrategy?: PositionStrategy): OverlayRef {
    const overlayRef = this.overlay.create({
      positionStrategy: positionStrategy ?? this.getDefaultPosition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.block()
    });

    const portal = new TemplatePortal(template, null!, context);
    overlayRef.attach(portal);

    overlayRef.backdropClick().subscribe(() => this.close(overlayRef));

    this.overlayRefs.push(overlayRef);
    return overlayRef;
  }

  openWithComponent<T>(component: any, positionStrategy?: PositionStrategy): ComponentRef<T> {
    const overlayRef = this.overlay.create({
      positionStrategy: positionStrategy ?? this.getDefaultPosition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.block()
    });

    const portal = new ComponentPortal<T>(component, null, this.injector);
    const componentRef: ComponentRef<T> = overlayRef.attach(portal);

    // overlayRef.backdropClick().subscribe(() => this.close(overlayRef));

    this.overlayRefs.push(overlayRef);
    return componentRef;
  }

  close(overlayRef: OverlayRef) {
    overlayRef.detach();
    overlayRef.dispose();
    this.overlayRefs = this.overlayRefs.filter(ref => ref !== overlayRef);
  }

  closeAll() {
    this.overlayRefs.forEach(ref => ref.dispose());
    this.overlayRefs = [];
  }

  private getDefaultPosition(): PositionStrategy {
    return this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();
  }
}
