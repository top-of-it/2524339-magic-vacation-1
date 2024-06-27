export default class AccentTypographyBuild {
  constructor(elementSelector, timer, classForActivate, properties, hasWordDelay) {
    this._MIN_TIME_OFFSET = 0;
    this._MAX_TIME_OFFSET = 500;
    this._WORD_DELAY = 600;

    this._elementSelector = elementSelector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._properties = Array.isArray(properties) ? properties : [properties];
    this._hasWordDelay = hasWordDelay;

    this._element = document.querySelector(this._elementSelector);

    if (this._element) {
      if (!this._element.dataset.originalText) {
        this._element.dataset.originalText = this._element.textContent.trim();
      }
    }

    this.prePareText();
  }

  createLetterElement(letter, wordIndex) {
    const span = document.createElement(`span`);
    span.textContent = letter;

    const transitionStyles = this._properties
      .map(
          (property) =>
            `${property} ${this._timer}ms ease ${this.getRandomTimeOffset(wordIndex)}ms`
      )
      .join(`, `);

    span.style.transition = transitionStyles;
    return span;
  }

  createWordElement(word, wordIndex) {
    const wordElement = Array.from(word).reduce((fragment, letter) => {
      fragment.appendChild(this.createLetterElement(letter, wordIndex));
      return fragment;
    }, document.createDocumentFragment());

    const wordContainer = document.createElement(`span`);
    wordContainer.classList.add(`text__word`);
    wordContainer.appendChild(wordElement);

    return wordContainer;
  }

  getRandomTimeOffset(wordIndex) {
    const letterOffset =
      Math.floor(
          Math.random() * (this._MAX_TIME_OFFSET - this._MIN_TIME_OFFSET + 1)
      ) + this._MIN_TIME_OFFSET;

    const wordDelay = this._hasWordDelay ? wordIndex * this._WORD_DELAY : 0;

    return wordDelay + letterOffset;
  }

  prePareText() {
    if (!this._element) {
      return;
    }

    const originalText = this._element.dataset.originalText;
    const text = originalText
      .split(` `)
      .filter((letter) => letter !== ``);

    const content = text.reduce((fragmentParent, word, wordIndex) => {
      const wordContainer = this.createWordElement(word, wordIndex);
      fragmentParent.appendChild(wordContainer);
      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }
    this._element.classList.add(this._classForActivate);
  }

  destroyAnimation() {
    if (!this._element) {
      return;
    }
    this._element.classList.remove(this._classForActivate);
  }
}
