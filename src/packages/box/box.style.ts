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

export const BoxStyles = css`

.Box{background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.3);margin:0 10px 10px;position:relative;font-size:12px;overflow:hidden}
.Box .BoxHeader,
.Box .BoxFooter{min-height:44px;position:relative;padding:4px 12px;
box-sizing:border-box;
display:-webkit-box;
display:-ms-flexbox;
display:-webkit-flex;
display:flex;
-webkit-box-pack:justify;
   -ms-flex-pack:justify;
-webkit-justify-content:space-between;
        justify-content:space-between;
-webkit-box-align:center;
   -ms-flex-align:center;
-webkit-align-items:center;
        align-items:center
}

.Box .BoxHeader{font-size:14px}
.Box .BoxFooter{color:#6d6d72}

.Box .BoxContent{position:relative}
.Box .BoxContent:after,
.Box .BoxContent:before{content:'';position:absolute;left:0;right:auto;height:1px;width:100%;background-color:#e1e1e1;display:block;z-index:15}
.Box .BoxContent:after{bottom:0;top:auto;
-webkit-transform-origin:50% 100%;
        transform-origin:50% 100%
}
.Box .BoxContent:before {top:0;bottom:auto;
-webkit-transform-origin:50% 0;
        transform-origin:50% 0
}
.Box .BoxContent .BoxContentInner{position:relative;padding:15px 10px}
.Box .BoxContent .BoxContentInner>p:first-child{margin-top:0}
.Box .BoxContent .BoxContentInner>p:last-child{margin-bottom:0}
.Box .BoxContent .Img{display:block}

.Box .BoxFooter .Link, .Box .BoxHeader .Link{position:relative;line-height:36px;height:36px;text-decoration:none;text-align:center;display:block;margin:0;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;color:#2196f3;background:none;padding:0 8px;font-size:14px;cursor:pointer;min-width:64px;
border:none;outline:0;
box-sizing:border-box;
-webkit-appearance:none;
   -moz-appearance:none;
    -ms-appearance:none;
        appearance:none;
text-transform:uppercase;
-webkit-transition-duration:300ms;
        transition-duration:300ms;
-webkit-transform:translate3d(0,0,0);
        transform:translate3d(0,0,0);
-webkit-user-select:none;
        user-select:none;
}
.Box .BoxFooter .Lump, .Box .BoxHeader .Lump{
box-sizing:border-box;
overflow:hidden;
-webkit-box-pack:justify;
-ms-flex-pack:justify;
-webkit-justify-content:space-between;
justify-content:space-between;
-webkit-box-align:center;
-ms-flex-align:center;
-webkit-align-items:center;
align-items:center;
}
.Box .BoxHeader[valign="top"],
.Box .BoxFooter[valign="top"]{
-webkit-box-align:start;
   -ms-flex-align:start;
-webkit-align-items:flex-start;
        align-items:flex-start
}
.Box .BoxHeader[valign="bottom"],
.Box .BoxFooter[valign="bottom"]{
-webkit-box-align:end;
   -ms-flex-align:end;
-webkit-align-items:flex-end;
        align-items:flex-end
}
/*块级卡片*/
.BoxBlock{margin-left:0;margin-right:0}

.BoxHeaderPic .BoxHeader{height:40vw;background-size:cover;background-position:center}
.BoxHeaderPic .BoxHeader .BoxMedia{position:absolute;left:0;right:0;bottom:0;padding:16px;background-color:rgba(0,0,0,.54)}
.BoxHeaderPic .BoxHeader .BoxMedia .BoxMediaTitle{font-size:24px;color:hsla(0,0%,100%,.87);line-height:36px}
.BoxHeaderPic .BoxHeader .BoxMedia .BoxMediaSub{color:hsla(0,0%,100%,.54);font-size:14px}

.Box .NoBorder{border:0}
.Box .NoBorder:after,
.Box .NoBorder:before{display:none}

/*用户卡片*/
.BoxUserInfo .BoxHeader{display:block;padding:10px}
.BoxUserInfo .BoxHeader .Avatar{float:left}
.BoxUserInfo .BoxHeader .Avatar img{display:block}
.BoxUserInfo .BoxHeader .Name{margin-left:44px;font-size:14px;font-weight:500;line-height:18px;height:18px}
.BoxUserInfo .BoxHeader .Date{margin-left:44px;font-size:12px;color:#999;height:16px}

/*有列表视图的卡片*/
.Box .ListBlock{margin:0}
.Box .ListBlock .ListItem:last-child:after,
.Box .ListBlock:before,
.Box .ListBlock:after{display:none}

.BoxList.ListBlock{background:none}
.BoxList.ListBlock:before,
.BoxList.ListBlock:after{display:none}
`;
 

