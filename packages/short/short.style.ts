/**
 * ShortStyles
 * @const: ShortStyles
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { css } from 'hi-element';
import { hiConfig } from "../config";

export const ShortStyles = css`

.Short{font-size:13px;font-weight:400;color:${hiConfig.color};background:rgba(0,0,0,.12);display:inline-block;height:32px;line-height:32px;border-radius:16px;padding:0 12px;vertical-align:middle;margin:2px 0;
    display:-webkit-inline-box;
    display:-ms-inline-flexbox;
    display:-webkit-inline-flex;
    display:inline-flex;
    -webkit-box-align:center;
       -ms-flex-align:center;
    -webkit-align-items:center;
            align-items:center
    }
    
    .Short .ShortMedia{width:32px;height:32px;font-size:14px;margin-left:-12px;vertical-align:top;border-radius:50%;text-align:center;line-height:32px;color:#fff;
    -webkit-box-flex:0;
    -webkit-flex-shrink:0;
        -ms-flex:0 0 auto;
            flex-shrink:0;
    box-sizing:border-box;
    display:-webkit-box;
    display:-ms-flexbox;
    display:-webkit-flex;
    display:flex;
    -webkit-box-align:center;
       -ms-flex-align:center;
    -webkit-align-items:center;
            align-items:center;
    -webkit-box-pack:center;
       -ms-flex-pack:center;
    -webkit-justify-content:center;
            justify-content:center
    }
    .Short .ShortMedia img{max-width:100%;max-height:100%;width:auto;height:auto;border-radius:50%;display:block}
    .Short .ShortMedia + .ShortLabel{margin-left:8px}
    .Short .ShortLabel{position:relative;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;
    -webkit-box-flex:1;
    -webkit-flex-shrink:1;
        -ms-flex:0 1 auto;
            flex-shrink:1
    }
    .Short .ShortLabel + .ShortDel{margin-left:4px}
    .Short .ShortDel{margin-right:-8px;width:24px;height:24px;text-align:center;line-height:24px;cursor:pointer;
    -webkit-box-flex:0;
    -webkit-flex-shrink:0;
        -ms-flex:0 0 auto;
            flex-shrink:0;
    background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D'%23000'%20height%3D'24'%20viewBox%3D'0%200%2024%2024'%20width%3D'24'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Cpath%20d%3D'M12%202C6.47%202%202%206.47%202%2012s4.47%2010%2010%2010%2010-4.47%2010-10S17.53%202%2012%202zm5%2013.59L15.59%2017%2012%2013.41%208.41%2017%207%2015.59%2010.59%2012%207%208.41%208.41%207%2012%2010.59%2015.59%207%2017%208.41%2013.41%2012%2017%2015.59z'%2F%3E%3Cpath%20d%3D'M0%200h24v24H0z'%20fill='none'%2F%3E%3C%2Fsvg%3E");
    background-repeat:no-repeat;
    background-position:center;
    background-size:20px 20px;
    opacity:.54}
    .Short .ShortDel:active{opacity:1}

`;
 

