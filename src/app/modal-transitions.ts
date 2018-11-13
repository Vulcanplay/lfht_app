import {Animation, PageTransition} from 'ionic-angular';

export class ModalFromRightEnter extends PageTransition {
  public init() {
    super.init();
    const ele = this.enteringView.pageRef().nativeElement;

    const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
    backdrop.beforeStyles({'z-index': 0, 'opacity': 0.3, 'visibility': 'visible'});

    const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
    wrapper.fromTo('transform', 'translateX(100%)', 'translateX(15%)');

    const contentWrapper = new Animation(this.plt, ele.querySelector('ion-content.content'));
    contentWrapper.beforeStyles({'width': '70%','margin-right':'15%'});

    this
      .element(this.enteringView.pageRef())
      .duration(300)
      .easing('cubic-bezier(.25, .1, .25, 1)')
      .add(backdrop)
      .add(wrapper)
      .add(contentWrapper);
  }
}


export class ModalFromRightLeave extends PageTransition {
  public init() {
    super.init();
    const ele = this.leavingView.pageRef().nativeElement;
    const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
    backdrop.beforeStyles({'visibility': 'hidden'});

    const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
    wrapper.fromTo('transform', 'translateX(15%)', 'translateX(100%)');

    this
      .element(this.leavingView.pageRef())
      .duration(300)
      .easing('cubic-bezier(.25, .1, .25, 1)')
      .add(backdrop)
      .add(wrapper);
  }
}


export class ModalScaleEnter extends PageTransition {
  public init() {
    super.init();
    const ele = this.enteringView.pageRef().nativeElement;
    const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
    wrapper.fromTo('transform', 'scale(0)', 'scale(1)');

    this
      .element(this.enteringView.pageRef())
      .duration(400)
      .easing('cubic-bezier(.1, .7, .1, 1)')
      .add(wrapper);
  }
}

export class ModalScaleLeave extends PageTransition {
  public init() {
    super.init();
    const ele = this.leavingView.pageRef().nativeElement;
    const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
    wrapper.fromTo('transform', 'scale(1)', 'scale(0)');

    this
      .element(this.leavingView.pageRef())
      .duration(400)
      .easing('cubic-bezier(.1, .7, .1, 1)')
      .add(wrapper);
  }
}

export class PaymentModalFromRightEnter extends PageTransition {
  public init() {
    super.init();
    const ele = this.enteringView.pageRef().nativeElement;

    const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
    backdrop.beforeStyles({'z-index': 0, 'opacity': 0.5, 'visibility': 'visible', 'background-color':'#717171'});

    const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
    wrapper.fromTo('transform', 'translateX(100%)', 'translateX(0%)');

    const contentWrapper = new Animation(this.plt, ele.querySelector('ion-content.content'));
    contentWrapper.beforeStyles({'width': '70%','margin':'auto 15%'});

    this
      .element(this.enteringView.pageRef())
      .duration(300)
      .easing('cubic-bezier(.25, .1, .25, 1)')
      .add(backdrop)
      .add(wrapper)
      .add(contentWrapper);
  }
}

export class PaymentModalFromRightLeave extends PageTransition {
  public init() {
    super.init();
    const ele = this.leavingView.pageRef().nativeElement;
    const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
    backdrop.beforeStyles({'visibility': 'hidden'});

    const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
    wrapper.fromTo('transform', 'translateX(0%)', 'translateX(100%)');

    this
      .element(this.leavingView.pageRef())
      .duration(300)
      .easing('cubic-bezier(.25, .1, .25, 1)')
      .add(backdrop)
      .add(wrapper);
  }
}

export class CenterModalFromRightEnter extends PageTransition {
  public init() {
    super.init();
    const ele = this.enteringView.pageRef().nativeElement;

    const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
    backdrop.beforeStyles({'z-index': 0, 'opacity': 0.8, 'visibility': 'visible', 'background-color':'#444444'});

    const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
    wrapper.fromTo('transform', 'translateX(100%)', 'translateX(0%)');

    const contentWrapper = new Animation(this.plt, ele.querySelector('ion-content.content'));
    contentWrapper.beforeStyles({'width': '90%','margin':'auto 5%'});

    this
      .element(this.enteringView.pageRef())
      .duration(300)
      .easing('cubic-bezier(.25, .1, .25, 1)')
      .add(backdrop)
      .add(wrapper)
      .add(contentWrapper);
  }
}

export class CenterModalFromRightLeave extends PageTransition {
  public init() {
    super.init();
    const ele = this.leavingView.pageRef().nativeElement;
    const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
    backdrop.beforeStyles({'visibility': 'hidden'});

    const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
    wrapper.fromTo('transform', 'translateX(0%)', 'translateX(100%)');

    this
      .element(this.leavingView.pageRef())
      .duration(300)
      .easing('cubic-bezier(.25, .1, .25, 1)')
      .add(backdrop)
      .add(wrapper);
  }
}

export class PPModalFromRightEnter extends PageTransition {
  public init() {
    super.init();
    const ele = this.enteringView.pageRef().nativeElement;

    const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
    backdrop.beforeStyles({'z-index': 0, 'opacity': 0.8, 'visibility': 'visible', 'background-color':'#444444'});

    const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
    wrapper.fromTo('transform', 'translateX(100%)', 'translateX(0%)');

    const contentWrapper = new Animation(this.plt, ele.querySelector('ion-content.content'));
    contentWrapper.beforeStyles({'width': '90%','height': '80%','margin':'10% 5%'});

    this
      .element(this.enteringView.pageRef())
      .duration(300)
      .easing('cubic-bezier(.25, .1, .25, 1)')
      .add(backdrop)
      .add(wrapper)
      .add(contentWrapper);
  }
}

export class PPModalFromRightLeave extends PageTransition {
  public init() {
    super.init();
    const ele = this.leavingView.pageRef().nativeElement;
    const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
    backdrop.beforeStyles({'visibility': 'hidden'});

    const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
    wrapper.fromTo('transform', 'translateX(0%)', 'translateX(100%)');

    this
      .element(this.leavingView.pageRef())
      .duration(300)
      .easing('cubic-bezier(.25, .1, .25, 1)')
      .add(backdrop)
      .add(wrapper);
  }
}


export class FilterModalFromRightEnter extends PageTransition {
  public init() {
    super.init();
    const ele = this.enteringView.pageRef().nativeElement;

    const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
    backdrop.beforeStyles({'z-index': 0, 'opacity': 0.3, 'visibility': 'visible'});

    const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
    wrapper.fromTo('transform', 'translateX(100%)', 'translateX(20%)');

    const contentWrapper = new Animation(this.plt, ele.querySelector('ion-content.content'));
    contentWrapper.beforeStyles({'width': '80%'});

    this
      .element(this.enteringView.pageRef())
      .duration(300)
      .easing('cubic-bezier(.25, .1, .25, 1)')
      .add(backdrop)
      .add(wrapper)
      .add(contentWrapper);
  }
}


export class FilterModalFromRightLeave extends PageTransition {
  public init() {
    super.init();
    const ele = this.leavingView.pageRef().nativeElement;
    const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
    backdrop.beforeStyles({'visibility': 'hidden'});

    const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
    wrapper.fromTo('transform', 'translateX(20%)', 'translateX(100%)');

    this
      .element(this.leavingView.pageRef())
      .duration(300)
      .easing('cubic-bezier(.25, .1, .25, 1)')
      .add(backdrop)
      .add(wrapper);
  }
}

