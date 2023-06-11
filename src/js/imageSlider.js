export default class ImageSlider {
  #currentPosition = 0;
  #sliderNumber = 0;
  #sliderWidth = 0;
  sliderWrapEl;
  sliderListEl;
  nextBtnEl;
  previousBtnEl;
  constructor() {
    this.assignElement();
    this.initSliderNumber();
    this.initSliderWidth();
    this.intiSliderListWidth();
    this.addEvent();
  }
  assignElement() {
    this.sliderWrapEl = document.getElementById('slider-wrap');
    this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
    this.previousBtnEl = this.sliderWrapEl.querySelector('#previous');
  }
  initSliderNumber() {
    this.#sliderNumber = this.sliderListEl.querySelectorAll('li').length;
  }
  initSliderWidth() {
    this.#sliderWidth = '90';
  }
  intiSliderListWidth() {
    this.sliderListEl.style.width = `${
      this.#sliderNumber * this.#sliderWidth
    }vw`;
  }
  addEvent() {
    this.nextBtnEl.addEventListener('click', this.moveToRight.bind(this));
    this.previousBtnEl.addEventListener('click', this.moveToLeft.bind(this));
  }
  moveToRight() {
    /*마지막에서 슬라이든 멈출 경우
    if (this.#currentPosition === this.#sliderNumber - 1) return;*/
    // 마지막 이미지 -> 첫번째 이미지로 이동
    this.#currentPosition++;
    if (this.#currentPosition === this.#sliderNumber) {
      this.#currentPosition = 0;
    }
    this.sliderListEl.style.left = `-${
      this.#sliderWidth * this.#currentPosition
    }vw`;
  }
  moveToLeft() {
    /*첫번째 이미지에서 슬라이드 멈출 경우
    if (this.#currentPosition === 0) return;*/
    // 첫번째 이미지-> 마지막 이미지
    this.#currentPosition--;
    if (this.#currentPosition === -1) {
      this.#currentPosition = this.#sliderNumber - 1;
    }
    this.sliderListEl.style.left = `-${
      this.#sliderWidth * this.#currentPosition
    }vw`;
  }
}