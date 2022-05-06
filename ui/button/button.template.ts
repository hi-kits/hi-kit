/**
 * button
 * @class: HButton
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, css,  html } from '@ele/index';

export const btntemplate = html`
    ${x => x.ishref ? 
    `<a class="btn" type="${x.htmltype}" download="${x.download}" href="${x.download}" target="${x.target}" rel="${x.rel}"><slot></slot></a>` : 
    `<button class="btn"><slot></slot></button>`
    }
 `;
 


