/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-24 13:56:58
 * @LastEditors: liulina
 * @LastEditTime: 2022-06-27 09:43:56
 */
import { css } from 'hi-element';
import { hiConfig } from '@packages/config';

export const datePickerStyle = css`
  :host {
    display: inline-block;
    font-size: 14px;
  }
  :host([block]) {
    display: block;
  }

  :host(:focus-within) h-popover,
  :host(:hover) h-popover {
    z-index: 2;
  }
  :host([disabled]) {
    pointer-events: none;
  }
  h-popover {
    width: 100%;
    height: 100%;
  }
  #select {
    display: flex;
    width: 100%;
    height: 100%;
    font-size: inherit;
  }
  #select span {
    flex: 1;
    text-align: left;
  }
  .icon {
    position: relative;
    margin-left: 0.5em;
    pointer-events: none;
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
  h-popover {
    display: block;
  }
  h-popcon {
    min-width: 100%;
  }
  .pop-footer {
    display: flex;
    justify-content: flex-end;
    padding: 0 0.8em 0.8em;
  }
  .pop-footer h-button {
    font-size: 0.8em;
    margin-left: 0.8em;
  }
`;
