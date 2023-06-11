export default class ImageSlider {
  #currentPosition = 0;
  #sliderNumber = 0;
  #sliderWidth = 0;
  #intervalId;
  #autoPlay = true;
  sliderWrapEl;
  sliderListEl;
  nextBtnEl;
  previousBtnEl;
  indicatorWrapEl;
  controlWrapEl;
  constructor() {
    this.assignElement();
    this.initSliderNumber();
    this.initSliderWidth();
    this.intiSliderListWidth();
    this.addEvent();
    this.createIndicator();
    this.setIndicator();
    this.initAutoPlay();
  }
  assignElement() {
    this.sliderWrapEl = document.getElementById('slider-wrap');
    this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
    this.previousBtnEl = this.sliderWrapEl.querySelector('#previous');
    this.indicatorWrapEl = this.sliderWrapEl.querySelector('#indicator-wrap');
    this.controlWrapEl = this.sliderWrapEl.querySelector('#control-wrap');
  }

  initAutoPlay() {
    this.#intervalId = setInterval(this.moveToRight.bind(this), 2000);
  }
  initSliderNumber() {
    this.#sliderNumber = this.sliderListEl.querySelectorAll('li').length;
  }
  initSliderWidth() {
    this.#sliderWidth = window
      .getComputedStyle(this.sliderWrapEl)
      .width.replace('px', '');
  }
  intiSliderListWidth() {
    this.sliderListEl.style.width = `${
      this.#sliderNumber * this.#sliderWidth
    }px`;
  }

  addEvent() {
    this.nextBtnEl.addEventListener('click', this.moveToRight.bind(this));
    this.previousBtnEl.addEventListener('click', this.moveToLeft.bind(this));
    this.indicatorWrapEl.addEventListener(
      'click',
      this.onClickIndicator.bind(this),
    );
    this.controlWrapEl.addEventListener('click', this.togglePlay.bind(this));
  }
  restartAutoPlay() {
    if (this.#autoPlay) {
      clearInterval(this.#intervalId);
      this.initAutoPlay();
    }
  }
  moveToRight() {
    /*마지막에서 슬라이든 멈출 경우
    if (this.#currentPosition === this.#sliderNumber - 1) return;*/
    // 마지막 이미지 -> 첫번째 이미지로 이동
    if (this.#currentPosition === this.#sliderNumber - 1) {
      this.#currentPosition = 0;
    } else {
      this.#currentPosition++;
    }
    this.sliderListEl.style.left = `-${
      this.#sliderWidth * this.#currentPosition
    }px`;
    this.restartAutoPlay();
    this.setIndicator();
  }
  moveToLeft() {
    /*첫번째 이미지에서 슬라이드 멈출 경우
    if (this.#currentPosition === 0) return;*/
    // 첫번째 이미지-> 마지막 이미지
    if (this.#currentPosition === 0) {
      this.#currentPosition = this.#sliderNumber - 1;
    } else {
      this.#currentPosition--;
    }
    this.sliderListEl.style.left = `-${
      this.#sliderWidth * this.#currentPosition
    }px`;
    this.restartAutoPlay();
    this.setIndicator();
  }
  createIndicator() {
    const docFragment = document.createDocumentFragment();
    for (let i = 0; i < this.#sliderNumber; i++) {
      const li = document.createElement('li');
      li.dataset.index = i;
      docFragment.appendChild(li);
    }
    this.indicatorWrapEl.querySelector('ul').appendChild(docFragment);
  }
  setIndicator() {
    //전부 비활성화
    this.indicatorWrapEl.querySelector('li.active')?.classList.remove('active');
    // 현재 슬라이드 활성화
    this.indicatorWrapEl
      .querySelector(`ul li:nth-child(${this.#currentPosition + 1})`)
      .classList.add('active');
  }
  onClickIndicator(event) {
    const indexPosition = parseInt(event.target.dataset.index, 10);
    // indicator가  아닌 곳 click 시, indexPosition = undefined;
    // parserInt(undefined,10)= NaN;
    if (Number.isInteger(indexPosition)) {
      this.#currentPosition = indexPosition;
      this.sliderListEl.style.left = `-${
        this.#sliderWidth * this.#currentPosition
      }px`;
      this.setIndicator();
    }
  }
  togglePlay(event) {
    const status = event.target.dataset.status;
    this.#autoPlay = status === 'play';
    this.controlWrapEl.classList.add(status);
    this.controlWrapEl.classList.remove(this.#autoPlay ? 'pause' : 'play');
    this.#autoPlay ? this.initAutoPlay() : clearInterval(this.#intervalId);
  }
}
