const bodyContainer = document.querySelector(`body`);

export const getActiveStorySlide = () =>{
  return parseInt(localStorage.getItem(`activeSlide`), 10) || 1;
};

export const removeStorySlideClasses = function () {
  bodyContainer.classList.remove(`story-slide1`);
  bodyContainer.classList.remove(`story-slide2`);
  bodyContainer.classList.remove(`story-slide3`);
  bodyContainer.classList.remove(`story-slide4`);
};
