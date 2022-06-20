import { css } from 'hi-element';

export const PopoverStyles = css`
  :host {
    display:inline;
    position:relative;
    overflow:visible;
  }
  .popoverWrap{
    position:absolute;
    display:flex;
    box-sizing: border-box;
    box-shadow: 2px 2px 15px rgba(0,0,0,0.15);
    box-sizing: border-box;
    transform:scale(0);
    opacity:0.5;
    border-radius: 3px;
    z-index:10000;
    transition:.1s cubic-bezier(.645, .045, .355, 1);
    transform-origin:inherit;
    background:#fff;
    visibility:hidden;
  }
  .popcon-content{
    box-sizing: border-box;
    display:flex;
    width: max-content;
    padding: 0 15px;
    flex:1;
    flex-direction:column;
  }
  .popcon-title {
    line-height: 30px;
    padding: 15px 30px 0 0;
    font-weight: 700;
    font-size: 14px;
    color: #4c5161;
    user-select: none;
    cursor: default;
    border-bottom: 1px solid rgba(0,0,0,.06);
  }
  .popcon-body {
    flex: 1;
    padding: 5px 0 15px 0;
  }
  .popcon-footer {
    padding: 3px 0 15px 0;
    margin-top: -3px;
    text-align: right;
    white-space: nowrap;
  }
  .btn-close{
    position:absolute;
    right:10px;
    top:10px;
    border:0;
  }
  .popcon-footer hi-button {
    font-size: .8em;
    margin-left: .8em;
}
.popcon-type{
    display:flex;
    width:30px;
    height:30px;
    font-size:22px;
    margin: 15px -10px 0 15px;
}
  :host([type="confirm"]) .popoverWrap{
    min-width:250px;
  }
  :host([type="confirm"]) .popcon-body{
      font-size:14px;
  }
  :host(:not([type])) .popcon-content,:host(:not([type])) .popcon-body{
    padding: 0;
  }
 
  :host([dir="top"]) .popoverWrap{
      bottom:100%;
      left:50%;
      transform:translate(-50%, -10px) scale(0);
      transform-origin: center bottom;
  }
  :host([dir="top"][open]) .popoverWrap,
  :host([dir="top"][trigger="hover"]:not([disabled]):hover) .popoverWrap,
  :host([dir="top"][trigger="focus"]:not([disabled]):focus-within) .popoverWrap{
      transform:translate(-50%,-10px) scale(1);
  }
  :host([dir="right"]) .popoverWrap{
      left:100%;
      top:50%;
      transform:translate(10px,-50%) scale(0);
      transform-origin: left;
  }
  :host([dir="right"][open]) .popoverWrap,
  :host([dir="right"][trigger="hover"]:not([disabled]):hover) .popoverWrap,
  :host([dir="right"][trigger="focus"]:not([disabled]):focus-within) .popoverWrap{
      transform:translate(10px,-50%) scale(1);
  }
  :host([dir="bottom"]) .popoverWrap{
      top:100%;
      left:50%;
      transform:translate(-50%,10px) scale(0);
      transform-origin: center top;
  }
  :host([dir="bottom"][open]) .popoverWrap,
  :host([dir="bottom"][trigger="hover"]:not([disabled]):hover) .popoverWrap,
  :host([dir="bottom"][trigger="focus"]:not([disabled]):focus-within) .popoverWrap{
      transform:translate(-50%,10px) scale(1);
  }
  :host([dir="left"]) .popoverWrap{
      right:100%;
      top:50%;
      transform:translate(-10px,-50%) scale(0);
      transform-origin: right;
  }
  :host([dir="left"][open]) .popoverWrap,
  :host([dir="left"][trigger="hover"]:not([disabled]):hover) .popoverWrap,
  :host([dir="left"][trigger="focus"]:not([disabled]):focus-within) .popoverWrap{
    transform:translate(-10px,-50%) scale(1);
  }
  :host([dir="lefttop"]) .popoverWrap{
      right:100%;
      top:0;
      transform:translate(-10px) scale(0);
      transform-origin: right top;
  }
  :host([dir="lefttop"][open]) .popoverWrap,
  :host([dir="lefttop"][trigger="hover"]:not([disabled]):hover) .popoverWrap,
  :host([dir="lefttop"][trigger="focus"]:not([disabled]):focus-within) .popoverWrap{
      transform:translate(-10px) scale(1);
  }
  :host([dir="leftbottom"]) .popoverWrap{
      right:100%;
      bottom:0;
      transform:translate(-10px) scale(0);
      transform-origin: right bottom;
  }
  :host([dir="leftbottom"][open]) .popoverWrap,
  :host([dir="leftbottom"][trigger="hover"]:not([disabled]):hover) .popoverWrap,
  :host([dir="leftbottom"][trigger="focus"]:not([disabled]):focus-within) .popoverWrap{
      transform:translate(-10px) scale(1);
  }
  :host([dir="topleft"]) .popoverWrap{
      bottom:100%;
      left:0;
      transform:translate(0,-10px) scale(0);
      transform-origin: left bottom;
  }
  :host([dir="topleft"][open]) .popoverWrap,
  :host([dir="topleft"][trigger="hover"]:not([disabled]):hover) .popoverWrap,
  :host([dir="topleft"][trigger="focus"]:not([disabled]):focus-within) .popoverWrap{
      transform:translate(0,-10px) scale(1);
  }
  :host([dir="topright"]) .popoverWrap{
      bottom:100%;
      right:0;
      transform:translate(0,-10px) scale(0);
      transform-origin: right bottom;
  }
  :host([dir="topright"][open]) .popoverWrap,
  :host([dir="topright"][trigger="hover"]:not([disabled]):hover) .popoverWrap,
  :host([dir="topright"][trigger="focus"]:not([disabled]):focus-within) .popoverWrap{
      transform:translate(0,-10px) scale(1);
  }
  :host([dir="righttop"]) .popoverWrap{
      left:100%;
      top:0;
      transform:translate(10px) scale(0);
      transform-origin: left top;
  }
  :host([dir="righttop"][open])) .popoverWrap,
  :host([dir="righttop"][trigger="hover"]:not([disabled]):hover) .popoverWrap,
  :host([dir="righttop"][trigger="focus"]:not([disabled]):focus-within) .popoverWrap{
      transform:translate(10px) scale(1);
  }
  :host([dir="rightbottom"]) .popoverWrap{
      left:100%;
      bottom:0;
      transform:translate(10px) scale(0);
      transform-origin: left bottom;
  }
  :host([dir="rightbottom"][open]) .popoverWrap,
  :host([dir="rightbottom"][trigger="hover"]:not([disabled]):hover) .popoverWrap,
  :host([dir="rightbottom"][trigger="focus"]:not([disabled]):focus-within) .popoverWrap{
      transform:translate(10px) scale(1);
  }
  :host([dir="bottomleft"]) .popoverWrap,
  :host(:not([dir])) .popoverWrap{
      left:0;
      top:100%;
      transform:translate(0,10px) scale(0);
      transform-origin: left top;
  }
  :host(:not([dir])[open]) .popoverWrap,
  :host(:not([dir])[trigger="hover"]:not([disabled]):hover) .popoverWrap,
  :host(:not([dir])[trigger="focus"]:not([disabled]):focus-within) .popoverWrap,
  :host([dir="bottomleft"][open]) .popoverWrap,
  :host([dir="bottomleft"][trigger="hover"]:not([disabled]):hover) .popoverWrap,
  :host([dir="bottomleft"][trigger="focus"]:not([disabled]):focus-within) .popoverWrap{
      transform:translate(0,10px) scale(1);
  }
  :host([dir="bottomright"]) .popoverWrap{
      right:0;
      top:100%;
      transform:translate(0,10px) scale(0);
      transform-origin: right top;
  }
  :host([dir="bottomright"][open]) .popoverWrap,
  :host([dir="bottomright"][trigger="hover"]:not([disabled]):hover) .popoverWrap,
  :host([dir="bottomright"][trigger="focus"]:not([disabled]):focus-within) .popoverWrap{
      transform:translate(0,10px) scale(1);
  }
  :host([trigger="contextmenu"]) .popoverWrap{
      right:auto;
      bottom:auto;
      left:var(--x,0);
      top:var(--y,100%);
      transform-origin: left top;
      transform:translate(5px,5px) scale(0);
      transition: .15s;
  }
  :host([trigger="contextmenu"][open]) .popoverWrap{
      transform:translate(5px,5px) scale(1);
  }
  :host([open]) .popoverWrap,
  :host([trigger="hover"]:not([disabled]):hover) .popoverWrap,
  :host([trigger="focus"]:not([disabled]):focus-within) .popoverWrap{
      opacity:1;
      visibility:visible;
  }
  slot{
    border-radius: inherit;
    cursor: pointer;
  }
`;