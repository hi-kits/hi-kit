/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-07-05 16:14:31
 * @LastEditors: liulina
 * @LastEditTime: 2022-07-08 15:57:57
 */
import { css } from 'hi-element';
import { hiConfig } from '../config';

export const UploadStyles = css`
  .ToastBox {
  }
  .icon{
    width: 1em;
    font-size: 1em;
  }
  /* Uploader: Drag & Drop */
  .uploader-error {display:none; font-size:14px; font-style:italic;}
  .uploader-drop {padding:15px; font-size:13px; text-align:center; color:#666; font-weight:bold;background-color:#eee; border:2px dashed #aaa; border-radius:10px; margin-top:40px; z-index:9999; display:none;}
  .uploader-dragover {padding:30px; color:#555; background-color:#ddd; border:1px solid #999;}

  /* Uploader: Progress bar */
  .uploader-progress {margin:30px 0 30px 0; width:100%; display:none;}
  .progress-container {height:7px; background:#9CBD94; position:relative; }
  .progress-bar {position:absolute; top:0; left:0; bottom:0; background:#45913A; width:0;}
  .progress-text {font-size:11px; line-height:9px; padding-left:10px;}
  .progress-pause {padding:0 0 0 7px;}
  .progress-resume-link {display:none;}
  .is-paused .progress-resume-link {display:inline;}
  .is-paused .progress-pause-link {display:none;}
  .is-complete .progress-pause {display:none;}

  /* Uploader: List of items being uploaded */
  .uploader-list {overflow:auto; margin-right:-20px; display:none;}
  .uploader-item {width:148px; height:90px; background-color:#666; position:relative; border:2px solid black; float:left; margin:0 6px 6px 0;}
  .uploader-item-thumbnail {width:100%; height:100%; position:absolute; top:0; left:0;}
  .uploader-item img.uploader-item-thumbnail {opacity:0;}
  .uploader-item-creating-thumbnail {padding:0 5px; font-size:9px; color:white;}
  .uploader-item-title {position:absolute; font-size:9px; line-height:11px; padding:3px 50px 3px 5px; bottom:0; left:0; right:0; color:white; background-color:rgba(0,0,0,0.6); min-height:27px;}
  .uploader-item-status {position:absolute; bottom:3px; right:3px;}

  /* Uploader: Hover & Active status */
  .uploader-item:hover, .is-active .uploader-item {border-color:#4a873c; cursor:pointer; }
  .uploader-item:hover .uploader-item-title, .is-active .uploader-item .uploader-item-title {background-color:rgba(74,135,60,0.8);}

  /* Uploader: Error status */
  .is-error .uploader-item:hover, .is-active.is-error .uploader-item {border-color:#900;}
  .is-error .uploader-item:hover .uploader-item-title, .is-active.is-error .uploader-item .uploader-item-title {background-color:rgba(153,0,0,0.6);}
  .is-error .uploader-item-creating-thumbnail {display:none;}
`;
