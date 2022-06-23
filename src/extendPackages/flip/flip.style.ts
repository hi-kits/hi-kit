/**
 * @const: FlipStyles
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { css } from 'hi-element';

export const FlipStyles = css`

.Flip {
    color: inherit;
    cursor: pointer;
    perspective: 1000px;
    position: relative;
}

.Front,
.Back {
    display: flex;
    position: absolute;
    height: 100%;
    width: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    transition: ease-in-out 600ms;
    background: #f9f9f9;
}
.Back {
    transform: rotateY(-180deg);
} 
.Flip:hover .Front {
    transform: rotateY(180deg);
}
.Flip:hover .Back {
    transform: rotateY(0deg);
}
 
 `;
  
 
 