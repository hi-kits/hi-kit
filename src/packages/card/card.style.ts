/**
 * BoxStyles
 * @const: BoxStyles
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { css } from 'hi-element';
import { hiConfig } from "../config";

export const CardStyles = css`

.Card{
    position:relative;
    background:#fff;
    border: 1px solid rgba(0,0,0,0.06);
    font-size:12px;
    overflow:hidden;
    border-radius: 12px
}

:host([noBorder]) .Card{
    border: 0;
}



.Card .NoBorder{
    border:0
}
.Card .NoBorder:after,
.Card .NoBorder:before{
    display:none
}
`;
 

