import { css } from 'hi-element';

export const datePaneStyle = css`
  :host {
    display: block;
    with: 300px;
  }
  /*
:host(:not([range])) .date-body{
	--borderRadius:50%;
}
*/
  .date-pane {
    padding: 0.8em;
    with: 300px;
  }
  .date-head,
  .date-week {
    display: flex;
  }
  .date-switch {
    flex: 1;
  }
  .date-switch[disabled] {
    opacity: 1;
  }
  .date-date{
    display: flex;
  }
  xy-button {
    padding: 1px;
    font-size: inherit;
    box-sizing: content-box;
  }
  .icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
  .prev,
  .next {
    width: 2.3em;
    height: 2.3em;
    transition: 0.3s;
  }
  .prev[hidden],
  .next[hidden] {
    visibility: hidden;
    opacity: 0;
  }
  .date-switch {
    margin: 0 0.3em;
  }
  .date-week-item {
    flex: 1;
    line-height: 2.4;
    text-align: center;
  }
  /*
.date-week::before{
	content:'';
	position:absolute;
	left:0;
	right:0;
	height:2.4em;
	background: var(--themeBackground,var(--themeColor,#42b983));
	opacity:.2;
}
*/
  .date-body {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 0.5em;
  }
  .date-button {
    position: relative;
    background: none;
    border: 0;
    padding: 0;
    color: var(--fontColor, #333);
    border-radius: var(--borderRadius, 0.25em);
    transition: background 0.3s, color 0.3s, opacity 0.3s, border-color 0.3s, border-radius 0.3s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    outline: 0;
  }
  .date-button::before {
    content: '';
    position: absolute;
    background: var(--themeColor, #42b983);
    pointer-events: none;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    transition: 0.3s;
    border: 1px solid transparent;
    z-index: -1;
    border-radius: inherit;
  }
  .date-button:not([disabled]):not([current]):not([select]):not([selectstart]):not([selectend]):hover,
  .date-button:not([disabled]):not([current]):not([select]):not([selectstart]):not([selectend]):focus {
    color: var(--themeColor, #42b983);
  }
  .date-button:not([disabled]):hover::before {
    opacity: 0.1;
  }
  .date-button:not([disabled]):focus::before {
    opacity: 0.2;
  }
  .date-day-item {
    box-sizing: content-box;
    min-width: 2.3em;
    height: 2.3em;
    justify-self: center;
  }
  .date-button[other] {
    opacity: 0.6;
  }
  .date-button[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
    background: rgba(0, 0, 0, 0.1);
    /*color:var(--errorColor,#f4615c);*/
  }
  .date-button[now] {
    color: var(--themeColor, #42b983);
  }
  .date-button[current] {
    background: var(--themeBackground, var(--themeColor, #42b983));
    color: #fff;
  }
  .date-button[select]:not([other]) {
    color: #fff;
    background: var(--themeBackground, var(--themeColor, #42b983));
  }
  .date-button[selectstart]:not([other]),
  .date-button[selectend]:not([other]) {
    color: #fff;
    border-color: var(--themeColor, #42b983);
    background: var(--themeBackground, var(--themeColor, #42b983));
  }
  .date-button[selectstart]:not([other])::after,
  .date-button[selectend]:not([other])::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 50%;
    overflow: hidden;
    border: 0.3em solid transparent;
    transform: translate(0, -50%);
  }
  .date-button[selectstart]:not([other])::after {
    border-left-color: var(--themeColor, #42b983);
    right: 100%;
  }
  .date-button[selectend]:not([other])::after {
    border-right-color: var(--themeColor, #42b983);
    left: 100%;
  }
  .date-button[selectstart][selectend]:not([other])::after {
    opacity: 0;
  }
  /*
.date-button[selectend]:not([other]){
	color: var(--themeColor,#42b983);
	border-color: var(--themeColor,#42b983);
	border-top-left-radius:0;
	border-bottom-left-radius:0;
}
.date-button[selectstart][selectend]:not([other]){
	border-color: var(--themeColor,#42b983);
	border-radius:var(--borderRadius,.25em);
}
*/
  .date-button[disabled][current] {
    /*background: var(--errorColor,#f4615c);*/
    color: #fff;
  }
  .date-con {
    position: relative;
  }
  .date-month,
  .date-year {
    position: absolute;
    display: grid;
    left: 0;
    top: 0.8em;
    right: 0;
    bottom: 0;
    grid-gap: 0.5em;
  }
  .date-month {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
  .date-year {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 1fr);
  }
  .date-month-item,
  .date-year-item {
    display: flex;
    margin: auto;
    width: 100%;
    height: 100%;
  }
  .date-mode {
    opacity: 0;
    visibility: hidden;
    z-index: -1;
    transition: 0.3s opacity, 0.3s visibility;
  }
  :host([range]) .date-button[current] {
    background: transparent;
    color: var(--themeColor, #42b983);
    border-color: var(--themeColor, #42b983);
  }
  .date-con[data-type='date'] .date-date,
  .date-con[data-type='month'] .date-month,
  .date-con[data-type='year'] .date-year {
    opacity: 1;
    visibility: inherit;
    z-index: 1;
  }
`;
