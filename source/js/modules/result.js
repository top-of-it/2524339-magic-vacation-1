export default () => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);

  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        let target = showResultEls[i].getAttribute(`data-target`);

        results.forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });

        let targetEl = Array.from(results).find((el) => el.getAttribute(`id`) === target);
        if (targetEl) {
          targetEl.classList.remove(`screen--hidden`);
          setTimeout(() => {
            targetEl.classList.add(`screen--show`);
          }, 0);
        }
      });
    }

    let playBtn = document.querySelector(`.js-play`);

    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        results.forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });

        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }
};
