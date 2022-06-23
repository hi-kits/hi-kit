import { html, ref, when } from 'hi-element';
import type { HiButton } from './button';

/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-21 17:53:32
 * @LastEditors: liulina
 * @LastEditTime: 2022-06-23 10:22:52
 */

// export const dialogTemplate = (
//     context,
//     definition
// ) => html`
export const template = html<HiButton>`
  ${when(
    x => x.href,
    html`<a
      class="btn"
      id="btn"
      href="${x => x.href}"
      ${when(x => x.download, html` download="${x => x.download}"`)}
      target="${x => x.target}"
      rel="${x => x.rel}"
      }
    ></a>`
  )}
  ${when(
    x => !x.href,
    html`<button
      class="btn"
      id="btn"
      part="control"
      @click="${x => x.onClick()}"
      @mousedown="${x => x.onMouceDown()}"
      @keydown="${x => x.onKeydown()}"
      ${when(x => x.disabled, html` disabled`)}
      ${when(x => x.checked, html` checked`)}
    ></button>`
  )}
  <img ${ref('control')} />
  <slot></slot>
`;
