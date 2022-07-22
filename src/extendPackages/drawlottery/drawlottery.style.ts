/**
 * @const: DrawlotteryStyles
 * @version 0.0.1
 * @author by fico on 2022/06/20
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { css } from 'hi-element';
import { hiConfig } from '@packages/config';

export const DrawlotteryStyles = css`
  .DrawlotteryModel {
    width: 90vw;
    height: 72vw;
    background-image: url('../../../assets/images/home/lights.png');
    background-repeat: no-repeat;
    background-size: contain;
    margin: 5vw auto;
    padding-top: 6vw;
    overflow: hidden;
  }

  .DrawlotteryModel .Table {
    width: 80vw;
    height: 59vw;
    margin: 0 auto;
    text-align: center;
  }

  .DrawlotteryModel .Table td div.Shadow {
    position: relative;
    background-color: #ffefef;
    color: #172761;
    width: 25vw;
    height: 18vw;
    margin: 0 auto;
    padding-top: 2vw;
    border-radius: 2vw;
    -webkit-box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.05), inset 0px -5px 0 #ffaeaa;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.05), inset 0px -5px 0 #ffaeaa;
  }

  .DrawlotteryModel .Table td .giftPic {
    position: relative;
    width: 9.6vw;
    margin: 0 auto;
    height: 9.6vw;
    overflow: hidden;
  }
  .DrawlotteryModel .Table td div img {
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .DrawlotteryModel .Table td p {
    width: 100%;
    font-size: 2.8vw;
    font-weight: 500;
    text-align: center;
    color: #9c1f23;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .DrawlotteryModel .Table td p.Sm {
    line-height: 1;
    bottom: 0.5vw;
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
  }

  .DrawlotteryModel .Table td.active {
    position: relative;
  }

  .DrawlotteryModel .Table td.active div:before {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: block;
    border-radius: 2vw;
    border: 1.2vw solid rgba(255, 0, 0, 0.45);
  }

  .DrawlotteryModel .Table td div.Start {
    background-color: #fef55e;
    background: repeating-linear-gradient(-50deg, #fee35c, #fee35c 5px, #fef55e 5px, #fef55e 12px);
    color: #f73437;
    font-size: 5vw;
    line-height: 6vw;
    font-weight: 600;
    padding-top: 2.5vw;
    -webkit-box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1), inset 0px -5px 0 #f1920a;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1), inset 0px -5px 0 #f1920a;
  }

  .DrawlotteryModel .Table td div.Start p {
    color: #642901;
  }

  .DrawlotteryModel .Table td div.Start:active,
  .DrawlotteryModel .Table td div.Start:focus {
    top: 3px;
    -webkit-transition-property: all;
    transition-property: all;
    -webkit-transition-duration: 0.15s;
    transition-duration: 0.15s;
    -webkit-box-shadow: inset 0px -1px 0 #f1920a;
    box-shadow: inset 0px -1px 0 #f1920a;
  }
`;
