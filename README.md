# Image Slider 📼

[프로젝트 사이트 바로가기](https://badahertz52.github.io/30projects_image-slider/)

## Index

#### <a href="#introduce">1. 프로젝트 소개</a>

#### <a href="#skill">2.테크 스킬 & 빌드</a>

#### <a href="#study">3. 배운 것들</a>

- <a href="#assetModules"> 1) asset modules</a>
- <a href="#docFragment"> 2) DocFragment</a>
- <a href="#style"> 3) js에서 width,height를 소수점까지 구하는 방법 </a>

---

## <div id="introduce">1. 프로젝트 소개</div>

- 📷 프로젝트 시뮬레이션 <br/> <img src="./simulation.gif" alt="project simulation gif" width="70%"  height="auto" style="max-width:450px">

해당 프로젝트는 "30개 프로젝트로 배우는 프론트엔드 with React" 수업 중에 하나로 웹팩과 바닐라 자바스크립트를 활용해 이미지 슬라이더를 구현하는 프로젝트이며 수업 내용에서 **asset/inline 사용으로 인한 오류를 수정하고 브라우저의 크기에 따라 이미지 슬라이드의 크기가 자동을 조정될 수 있는 기능을 추가**했다.

이미지 슬라이더는 다음의 기능들을 가지고 있다.

- 좌우 버튼, 인디케이터 버튼(이미지 하단에 있는 버튼)을 활용해 이미지 슬라이드
- 이미지 개수에 따라 해당 개수 만큼의 인디케이터 버튼 생성
- 자동으로 이미지 슬라이드 실행 가능하고 자동 실행을 멈춤

## <div id="skill">2.테크 스킬 & 빌드</div>

### 1) 스킬

html, css, js, webpack

### 2) 빌드

#### Installation

```bash
> npm i
```

#### Run Dev Server

```bash
> npm run dev
```

#### Build

```bash
> npm run build
```

## <div id="study">3. 배운 것들</div>

### <div id="assetModules"> 1) asset modules</div>

웹팩 버전5 이전에는 웹팩에서 파일을 사용하려면 별도로 file-loader 를 설치해야했는데 버전5부터는 그럴 필요 없이 웹팩의 asset modules를 사용하면 된다.

#### A. asset modules 사용 방법

- webpack.config.js

```js
module: {
  rules: [
....
    {
      // test : 정규식을 활용해 사용할 이미지 파일의 확장자를 지정
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      // type: 사용할 asset-modules 유형 선택
		    type: 'asset/resource',
		    generator: {
        // 번들링된 이미지 파일의 이름과 경로
	       filename: 'image/[name][ext]'

		    }
    },
  ],
}
```

- index.html

```html
<!--asset modules 를 활용해 이미지 파일 사용하기-->
<img src="<%= require('./src/image/red.jpeg') %>" />

<!--아래와 같이 작성하면, 이미지 파일을 찾지 못함-->
<img src="./src/image/red.jpeg" />
```

### B. asset modules 유형

| 유형 | 기능 |
| --- | --- |
| asset/resource | 파일을 별도의 파일로 내보내고 URL을 내보냄. file-loader 와 유사 |
| asset/inline | 파일을 데이터 URI로 내보내고 URL을 내보냄. url-loader 와 유사 |
| asset/source | 파일의 소스 코드를 내보내고 raw-loader 와 유사 |
| asset | 파일의 크기에 따라 자동으로 위의 모듈 중 하나를 선택 |

### <div id="docFragment"> 2) DocFragment</div>

#### A. DocFragment?

DocFragment는 DOM 노드이지만, 메인 DOM 트리의 자식 노드가 아니다. 그래서 DocFragment 추가 시 페이지의 reflow를 유발하지 않고 DOM 조작을 최소하하여 성능을 향상 시킬 수 있지만. 실제로 DOM 과 동기화 되지 않기 때문에 DocFragment에 있는 요소의 속성이나 상태가 변경되어도 실제 DOM에 반영되지 않고 이벤트 버블링이 지원되지 않는다.

- reflow?
  - reflow는 문서 내 요소의 위치와 도형을 다시 계산하기 위한 웹브라우저 프로세스의 이름으로, 문서의 일부 또는 전체를 다시 렌더링하는 데 사용된다.

```js
const docFragment = document.createDocumentFragment();
```

#### B. DocFragment 활용

프로젝트에서는 이미지의 개수에 따라 인디케이터 요소를 생성하는것에 DocFragment를 활용했다.

### <div id="style"> 3) js에서 width,height를 소수점까지 구하는 방법 </div>

#### A. 프로젝트에서 slider-wrap 과 slider 의 기능,사이즈

```
  slider-wrap
    -slider
      -image
```

| 요소 | 기능 |
| --- | --- |
| slider-wrap | slider를 감싸는 요소로, 슬라이드 안의 이미지의 사이즈와 같은 사이즈를 가진다 |
| slider | 여러개의 이미지들을 감싸는 요소로, 너비 = 이미지 너비 \* 이미지 개수 |

### B. clientWidth 로 인한 오류

빈응형 웹을 위해 css에서 'vw'를 활용해 width를 지정했는데, js에서 clientWidth를 사용해 slider-wrap 의 width값을 구하고 이를 활용해 slider의 너비를 구해야하늗데 문제는 slider-wrap의 너비에 소수점이 있을 경우, slider 의 너비는 이미지 너비 \* 이미지 개수 보다 작아져서 슬라이드의 기능에 오류가 생겼다.

오류의 원인은 clientWidth는 너비가 소수점일 경우 소수점을 버리고 정수로 변환해 반환하기 때문이였다. offsetWidth 또한 정수로 변환해 반환한다.

- style.css

```css
#target {
  width: 20vw; /* (100vw =1024px 일때 20vw = 204.8px*/
}
```

- imageSlider.js

```js
const el = document.querySelector(#target);
const width = el.clientWidth;
console.log(el.clientWidth) // 204 (100vw =1024px 일때)
```

### C. 소수점까지 포함하는 width,height를 구하는 방법

정수로 깔끔하게 떨어지면서 반응형 웹도 가능하게 css 파일을 수정할 수 있지만, 그럴 경우 화면의 크기 단위로 코드를 추가해야하는 번거로움이 있어서 js에서 소수점까지 포함하는 width,height를 구하는 메서드들을 활용했다.

#### **js에서 사이즈를 소수점까지 반환하는 메서드**

#### a. DOMRect 객체를 반환하는 getBoundingClientRect(), getClientRect()

- DOMRect 객체

  - padding과 border-width를 포함해 전체 엘리먼트가 들어 있는 가장 작은 사각형인 DOMRect 객체

- getBoundingClientRect() : DOMRect 객체를 반환

```js
const width = el.getBoundingClientRect().width;
console.log(width); // 204.8
```

- getClientRect() : DOMRect 객체 컬렉션을 반환

```js
const width = el.getClientRect()[0].width;
console.log(width); // 204.8
```

#### b. window.getComputerStyle(el)

```js
const width = window.getComputedStyle(this.sliderWrapEl).width;
console.log(width); // 204.8px
console.log(width.replace('px', '')); //204.8
```
------
##### 이미지 자료 출처:https://pixabay.com/ko/
#### 파비콘 자료 출처: :https://icons8.kr/icon/43665/%EC%82%AC%EC%A7%84%EC%9D%98-%EC%8A%A4%ED%83%9D
