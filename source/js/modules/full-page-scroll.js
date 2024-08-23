import throttle from "lodash/throttle";
import AccentTypographyBuild from "../utils/text-animation";
import {getActiveStorySlide, removeStorySlideClasses} from "../utils/story";

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 1000;
    this.scrollFlag = true;
    this.timeout = null;

    this.bodyContainer = document.querySelector(`body`);
    this.screenElements = document.querySelectorAll(
        `.screen:not(.screen--result)`
    );
    this.menuElements = document.querySelectorAll(
        `.page-header__menu .js-menu-link`
    );
    this.footer = document.querySelector(`.screen__footer`);

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(
        `wheel`,
        throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true})
    );
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.menuElements.forEach((menuItem) => {
      menuItem.addEventListener(`click`, (event) => {
        event.preventDefault();

        const currentHref = event.target.hash;
        const targetScreenId = currentHref.slice(1);

        if (this.screenElements[this.activeScreen].id === targetScreenId) {
          event.target.blur();
          return;
        }

        const duration = 100;

        if (
          window.location.hash === `#story` &&
          menuItem.dataset.href === `prizes`
        ) {
          document
            .querySelector(`.screen.active`)
            .classList.add(`switched-screen`);
        }

        this.screenElements[this.activeScreen].classList.remove(`active`);

        setTimeout(() => {
          window.location.href = currentHref;
        }, duration);
      });
    });

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    if (this.scrollFlag) {
      this.reCalculateActiveScreenPosition(evt.deltaY);
      const currentPosition = this.activeScreen;
      if (currentPosition !== this.activeScreen) {
        this.changePageDisplay();
      }
    }
    this.scrollFlag = false;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.scrollFlag = true;
    }, this.THROTTLE_TIMEOUT);
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex(
        (screen) => location.hash.slice(1) === screen.id
    );
    this.activeScreen = newIndex < 0 ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.emitChangeDisplayEvent();
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.startTypographyAnimation();
  }

  changeVisibilityDisplay() {
    removeStorySlideClasses();

    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`switched-screen`, `active`);
    });

    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);

    setTimeout(() => {
      this.screenElements[this.activeScreen].classList.add(`active`);
    }, this.THROTTLE_TIMEOUT);

    if (window.location.hash === `#story`) {
      this.bodyContainer.classList.add(`story-slide${getActiveStorySlide()}`);
    }
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find(
        (item) => item.dataset.href === this.screenElements[this.activeScreen].id
    );

    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        screenId: this.activeScreen,
        screenName: this.screenElements[this.activeScreen].id,
        screenElement: this.screenElements[this.activeScreen],
      },
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(
          this.screenElements.length - 1,
          ++this.activeScreen
      );
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }

  createAndRunAnimation(
      selector,
      timer,
      classForActivate,
      properties,
      hasWordDelay,
      delay
  ) {
    const animation = new AccentTypographyBuild(
        selector,
        timer,
        classForActivate,
        properties,
        hasWordDelay
    );
    animation.destroyAnimation();
    setTimeout(() => {
      animation.runAnimation();
    }, delay);
  }

  startTypographyAnimation() {
    const currentScreenId = this.screenElements[this.activeScreen].id;

    if (currentScreenId === `top`) {
      this.createAndRunAnimation(
          `.intro__title`,
          500,
          `active-text-animation`,
          [`transform`, `opacity`],
          true,
          500
      );

      this.createAndRunAnimation(
          `.intro__date`,
          500,
          `active-text-animation`,
          [`transform`, `opacity`],
          false,
          2000
      );
    }

    if (currentScreenId === `story`) {
      this.createAndRunAnimation(
          `.slider__item-title`,
          500,
          `active-text-animation`,
          [`transform`, `opacity`],
          true,
          500
      );
    }

    if (currentScreenId === `prizes`) {
      this.createAndRunAnimation(
          `.prizes__title`,
          500,
          `active-text-animation`,
          [`transform`, `opacity`],
          true,
          500
      );
    }

    if (currentScreenId === `rules`) {
      this.createAndRunAnimation(
          `.rules__title`,
          500,
          `active-text-animation`,
          [`transform`, `opacity`],
          true,
          500
      );
    }

    if (currentScreenId === `game`) {
      this.createAndRunAnimation(
          `.game__title`,
          500,
          `active-text-animation`,
          [`transform`, `opacity`],
          true,
          500
      );
    }
  }
}
