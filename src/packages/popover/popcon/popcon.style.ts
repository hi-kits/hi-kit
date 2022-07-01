/*
 * @Descripttion: 
 * @version: 
 * @Author: liulina
 * @Date: 2022-06-30 19:20:53
 * @LastEditors: liulina
 * @LastEditTime: 2022-06-30 19:29:05
 */
import { css } from 'hi-element';

export const PopconStyles = css`
:host{
    position:absolute;
    display:flex;
    box-shadow: 2px 2px 15px rgba(0,0,0,0.15);
    box-sizing: border-box;
    transform:scale(0);
    opacity:0.5;
    border-radius: 3px;
    z-index:10;
    transition:.3s cubic-bezier(.645, .045, .355, 1);
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
.popcon-footer xy-button {
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
/*
:host(:not([type="confirm"])) .popcon-type,
:host(:not([type="confirm"])) .popcon-footer,
:host(:not([type])) .popcon-title,
:host(:not([type])) .btn-close{
    display:none;
}
*/
:host([type="confirm"]){
    min-width:250px;
}
:host([type="confirm"]) .popcon-body{
    font-size:14px;
}
:host(:not([type])) .popcon-content,:host(:not([type])) .popcon-body{
    padding: 0;
}
`;