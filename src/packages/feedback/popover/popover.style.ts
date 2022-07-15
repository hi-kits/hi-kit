import { css } from 'hi-element';

export const PopoverStyles = css`
  :host {
    display: inline-block;
    position: relative;
    overflow: visible;
  }
  :host([dir='top']) ::slotted(h-popcon) {
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, -10px) scale(0);
    transform-origin: center bottom;
  }
  :host([dir='top']) ::slotted(h-popcon[open]),
  :host([dir='top'][trigger='hover']:not([disabled]):hover) ::slotted(h-popcon),
  :host([dir='top'][trigger='focus']:not([disabled]):focus-within) ::slotted(h-popcon) {
    transform: translate(-50%, -10px) scale(1);
  }
  :host([dir='right']) ::slotted(h-popcon) {
    left: 100%;
    top: 50%;
    transform: translate(10px, -50%) scale(0);
    transform-origin: left;
  }
  :host([dir='right']) ::slotted(h-popcon[open]),
  :host([dir='right'][trigger='hover']:not([disabled]):hover) ::slotted(h-popcon),
  :host([dir='right'][trigger='focus']:not([disabled]):focus-within) ::slotted(h-popcon) {
    transform: translate(10px, -50%) scale(1);
  }
  :host([dir='bottom']) ::slotted(h-popcon) {
    top: 100%;
    left: 50%;
    transform: translate(-50%, 10px) scale(0);
    transform-origin: center top;
  }
  :host([dir='bottom']) ::slotted(h-popcon[open]),
  :host([dir='bottom'][trigger='hover']:not([disabled]):hover) ::slotted(h-popcon),
  :host([dir='bottom'][trigger='focus']:not([disabled]):focus-within) ::slotted(h-popcon) {
    transform: translate(-50%, 10px) scale(1);
  }
  :host([dir='left']) ::slotted(h-popcon) {
    right: 100%;
    top: 50%;
    transform: translate(-10px, -50%) scale(0);
    transform-origin: right;
  }
  :host([dir='left']) ::slotted(h-popcon[open]),
  :host([dir='left'][trigger='hover']:not([disabled]):hover) ::slotted(h-popcon),
  :host([dir='left'][trigger='focus']:not([disabled]):focus-within) ::slotted(h-popcon) {
    transform: translate(-10px, -50%) scale(1);
  }
  :host([dir='lefttop']) ::slotted(h-popcon) {
    right: 100%;
    top: 0;
    transform: translate(-10px) scale(0);
    transform-origin: right top;
  }
  :host([dir='lefttop']) ::slotted(h-popcon[open]),
  :host([dir='lefttop'][trigger='hover']:not([disabled]):hover) ::slotted(h-popcon),
  :host([dir='lefttop'][trigger='focus']:not([disabled]):focus-within) ::slotted(h-popcon) {
    transform: translate(-10px) scale(1);
  }
  :host([dir='leftbottom']) ::slotted(h-popcon) {
    right: 100%;
    bottom: 0;
    transform: translate(-10px) scale(0);
    transform-origin: right bottom;
  }
  :host([dir='leftbottom']) ::slotted(h-popcon[open]),
  :host([dir='leftbottom'][trigger='hover']:not([disabled]):hover) ::slotted(h-popcon),
  :host([dir='leftbottom'][trigger='focus']:not([disabled]):focus-within) ::slotted(h-popcon) {
    transform: translate(-10px) scale(1);
  }
  :host([dir='topleft']) ::slotted(h-popcon) {
    bottom: 100%;
    left: 0;
    transform: translate(0, -10px) scale(0);
    transform-origin: left bottom;
  }
  :host([dir='topleft']) ::slotted(h-popcon[open]),
  :host([dir='topleft'][trigger='hover']:not([disabled]):hover) ::slotted(h-popcon),
  :host([dir='topleft'][trigger='focus']:not([disabled]):focus-within) ::slotted(h-popcon) {
    transform: translate(0, -10px) scale(1);
  }
  :host([dir='topright']) ::slotted(h-popcon) {
    bottom: 100%;
    right: 0;
    transform: translate(0, -10px) scale(0);
    transform-origin: right bottom;
  }
  :host([dir='topright']) ::slotted(h-popcon[open]),
  :host([dir='topright'][trigger='hover']:not([disabled]):hover) ::slotted(h-popcon),
  :host([dir='topright'][trigger='focus']:not([disabled]):focus-within) ::slotted(h-popcon) {
    transform: translate(0, -10px) scale(1);
  }
  :host([dir='righttop']) ::slotted(h-popcon) {
    left: 100%;
    top: 0;
    transform: translate(10px) scale(0);
    transform-origin: left top;
  }
  :host([dir='righttop']) ::slotted(h-popcon[open]),
  :host([dir='righttop'][trigger='hover']:not([disabled]):hover) ::slotted(h-popcon),
  :host([dir='righttop'][trigger='focus']:not([disabled]):focus-within) ::slotted(h-popcon) {
    transform: translate(10px) scale(1);
  }
  :host([dir='rightbottom']) ::slotted(h-popcon) {
    left: 100%;
    bottom: 0;
    transform: translate(10px) scale(0);
    transform-origin: left bottom;
  }
  :host([dir='rightbottom']) ::slotted(h-popcon[open]),
  :host([dir='rightbottom'][trigger='hover']:not([disabled]):hover) ::slotted(h-popcon),
  :host([dir='rightbottom'][trigger='focus']:not([disabled]):focus-within) ::slotted(h-popcon) {
    transform: translate(10px) scale(1);
  }
  :host([dir='bottomleft']) ::slotted(h-popcon),
  :host(:not([dir])) ::slotted(h-popcon) {
    left: 0;
    top: 100%;
    transform: translate(0, 10px) scale(0);
    transform-origin: left top;
  }
  :host(:not([dir])) ::slotted(h-popcon[open]),
  :host(:not([dir])[trigger='hover']:not([disabled]):hover) ::slotted(h-popcon),
  :host(:not([dir])[trigger='focus']:not([disabled]):focus-within) ::slotted(h-popcon),
  :host([dir='bottomleft']) ::slotted(h-popcon[open]),
  :host([dir='bottomleft'][trigger='hover']:not([disabled]):hover) ::slotted(h-popcon),
  :host([dir='bottomleft'][trigger='focus']:not([disabled]):focus-within) ::slotted(h-popcon) {
    transform: translate(0, 10px) scale(1);
  }
  :host([dir='bottomright']) ::slotted(h-popcon) {
    right: 0;
    top: 100%;
    transform: translate(0, 10px) scale(0);
    transform-origin: right top;
  }
  :host([dir='bottomright']) ::slotted(h-popcon[open]),
  :host([dir='bottomright'][trigger='hover']:not([disabled]):hover) ::slotted(h-popcon),
  :host([dir='bottomright'][trigger='focus']:not([disabled]):focus-within) ::slotted(h-popcon) {
    transform: translate(0, 10px) scale(1);
  }
  :host([trigger='contextmenu']) ::slotted(h-popcon) {
    right: auto;
    bottom: auto;
    left: var(--x, 0);
    top: var(--y, 100%);
    transform-origin: left top;
    transform: translate(5px, 5px) scale(0);
    transition: 0.15s;
  }
  :host([trigger='contextmenu']) ::slotted(h-popcon[open]) {
    transform: translate(5px, 5px) scale(1);
  }
  :host ::slotted(h-popcon[open]),
  :host([trigger='hover']:not([disabled]):hover) ::slotted(h-popcon),
  :host([trigger='focus']:not([disabled]):focus-within) ::slotted(h-popcon) {
    opacity: 1;
    visibility: visible;
  }
  slot {
    border-radius: inherit;
  }
`;
