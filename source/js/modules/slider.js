import Swiper from "swiper";
import {removeStorySlideClasses} from "../utils/story";

export default () => {
  let storySlider;
  let bodyContainer = document.querySelector(`body`);
  let sliderContainer = document.getElementById(`story`);

  const saveActiveSlide = (index) => {
    localStorage.setItem(`activeSlide`, index);
  };

  const getActiveSlide = () => {
    return parseInt(localStorage.getItem(`activeSlide`), 10) || 1;
  };

  const setBackgroundAndClass = (slideNumber) => {
    removeStorySlideClasses();

    switch (slideNumber) {
      case 1:
        bodyContainer.classList.add(`story-slide1`);
        sliderContainer.style.backgroundImage = `url("img/slide1.jpg"), linear-gradient(180deg, rgba(83, 65, 118, 0) 0%, #523E75 16.85%)`;
        break;
      case 2:
        bodyContainer.classList.add(`story-slide2`);
        sliderContainer.style.backgroundImage = `url("img/slide2.jpg"), linear-gradient(180deg, rgba(45, 54, 179, 0) 0%, #2A34B0 16.85%)`;
        break;
      case 3:
        bodyContainer.classList.add(`story-slide3`);
        sliderContainer.style.backgroundImage = `url("img/slide3.jpg"), linear-gradient(180deg, rgba(92, 138, 198, 0) 0%, #5183C4 16.85%)`;
        break;
      case 4:
        bodyContainer.classList.add(`story-slide4`);
        sliderContainer.style.backgroundImage = `url("img/slide4.jpg"), linear-gradient(180deg, rgba(45, 39, 63, 0) 0%, #2F2A42 16.85%)`;
        break;
    }
  };

  const setSlider = function () {
    const initialSlideNumber = getActiveSlide();
    const initialSlideIndex = (initialSlideNumber - 1) * 2;

    setBackgroundAndClass(initialSlideNumber);

    if (window.innerWidth / window.innerHeight < 1 || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        initialSlide: initialSlideIndex,
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`,
        },
        keyboard: {
          enabled: true,
        },
        on: {
          slideChange: () => {
            if (!storySlider) {
              saveActiveSlide(1);
              return;
            }
            const activeSlideNumber = Math.floor(storySlider.activeIndex / 2) + 1;
            setBackgroundAndClass(activeSlideNumber);
            saveActiveSlide(activeSlideNumber);
          },
          resize: () => {
            if (storySlider) {
              storySlider.update();
            }
          },
        },
        observer: true,
        observeParents: true,
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        initialSlide: initialSlideIndex,
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`,
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true,
        },
        on: {
          slideChange: () => {
            if (!storySlider) {
              saveActiveSlide(1);
              return;
            }
            const activeSlideNumber = Math.floor(storySlider.activeIndex / 2) + 1;
            setBackgroundAndClass(activeSlideNumber);
            saveActiveSlide(activeSlideNumber);
          },
          resize: () => {
            if (storySlider) {
              storySlider.update();
            }
          },
        },
        observer: true,
        observeParents: true,
      });
    }
  };

  window.addEventListener(`resize`, function () {
    if (storySlider) {
      storySlider.destroy();
    }
    setSlider();
  });

  setSlider();
};
