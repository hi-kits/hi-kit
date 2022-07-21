/**
 * @const: HiCountdown 倒计时
 * @version 0.0.1
 * @author by fico on 2022/06/21
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, attr, observable, ref, css,  html } from 'hi-element';
// 混入基础功能
import { HIElementBase } from '../../packages/_mixins/hiElementBase';
// 样式助手
import { Style } from '@utils/style/style';
// 日期
import { DateServices } from '@utils/date.services'

// 样式
const styles = css`

:host .Countdown{
    text-align: center;
}
:host .Countdown span{
    color: #000;
    background: var(--colorWhite);
    border-radius: var(--borderRadius);
    width:4vw;
    text-align: center;
    font-size: 4.6667vw;
    font-weight: bold;
    display: inline-block;
    line-height: 8.26667vw;
}
:host .Countdown span:not(:first-child){
    margin-left:0.5vw;
}
:host .Countdown b{
    display: inline-block;
    color: #fff;
    font-size: 2.8vw;
    margin-left:1.06667vw;
    position: relative;
    vertical-align: -webkit-baseline-middle;
}
:host .Countdown b:not(:last-child){
    vertical-align: -webkit-baseline-middle;
    margin-right: 1vw;
}
`;
// 模版文件
const template = html<HiCountdown>`
<template>
    <div class="starttime" ${ref('countdownTxt')}></div>
</template>
`;
// 定义元素
@customElement({
   name: 'h-countdown',
   styles,
   template,
   shadowOptions: { mode: 'closed'}
})
export class HiCountdown extends HIElementBase {
    // ------------------ 构造函数 ------------------
    // ------------------ 参数 ------------------
    
    /**
     * 天
     * @date 6/22/2022 - 10:59:18 AM
     *
     * @type {Array<any>}
     */
    days: Array<any> = ['0', '0'];
    
    /**
     * 时
     * @date 6/22/2022 - 10:59:55 AM
     *
     * @type {Array<any>}
     */
    hours: Array<any> = ['0', '0'];
    
    /**
     * 分
     * @date 6/22/2022 - 11:00:02 AM
     *
     * @type {Array<any>}
     */
    minutes: Array<any> = ['0', '0'];
    
    /**
     * 秒
     * @date 6/22/2022 - 11:00:10 AM
     *
     * @type {Array<any>}
     */
    seconds: Array<any> = ['0', '0'];
    
    /**
     * 定时器
     * @date 6/22/2022 - 11:00:20 AM
     *
     * @type {*}
     */
    timerS;
    @observable
    countdownTxt: HTMLDivElement;
    // ------------------ 属性 ------------------

    @attr beginTime: any = '2022-09-10';
    private beginTimeChanged(oldValue, newValue): void {
        this.beginTime = + new Date(DateServices(new Date(newValue), 'yyyy-MM-dd hh:mm:ss'));
    }
    @attr endTime: any  = '2023-10-11';
    private endTimeChanged(oldValue, newValue): void {
        this.endTime = +new Date(DateServices(new Date(newValue), 'yyyy-MM-dd hh:mm:ss'));
    }
    
    /**
     * 文字尺寸
     * @public number
     */
    @attr size;
    sizeChanged(oldValue, newValue): void {
        Style(this)({ 
            fontSize: newValue + 'px'
        });      
    }
    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void {
        super.connectedCallback();
        this.countdown();
    }
    // 倒计时
    countdown() {
        let nowDate = this.beginTime + 1000;
        const antitime = () => {
            nowDate += 1000;
            // 相差的总秒数
            // tslint:disable-next-line: radix
            const totalSeconds = parseInt(String((this.endTime - nowDate) / 1000));
            if (totalSeconds > 0) {
                // 天数
                const days = Math.floor(totalSeconds / (60 * 60 * 24)) + '';
                // 取模（余数）
                let modulo = totalSeconds % (60 * 60 * 24);
                // 小时数
                const hours = Math.floor(modulo / (60 * 60)) + '';
                modulo = modulo % (60 * 60);
                // 分钟
                const minutes = Math.floor(modulo / 60) + '';
                // 秒
                const seconds = modulo % 60 + '';
                this.days = days.length === 1 ? ['0', days] : Array.from(days);
                this.hours = hours.length === 1 ? ['0', hours] : Array.from(hours);
                this.minutes = minutes.length === 1 ? ['0', minutes] : Array.from(minutes);
                this.seconds = seconds.length === 1 ? ['0', seconds] : Array.from(seconds);
            } else {
                clearInterval(this.timerS);
                this.days = ['0', '0'];
                this.hours = ['0', '0'];
                this.minutes = ['0', '0'];
                this.seconds = ['0', '0'];
            }
            try {
                // tslint:disable-next-line: max-line-length
                this.countdownTxt.innerHTML = `<span>${this.days[0]}</span><span>${this.days[1]}</span><b>天</b><span>${this.hours[0]}</span><span>${this.hours[1]}</span><b>时</b><span>${this.minutes[0]}</span><span>${this.minutes[1]}</span><b>分</b><span>${this.seconds[0]}</span><span>${this.seconds[1]}</span><b>秒</b>`;
            } catch (error) {
            }
        };
        this.timerS = setInterval(antitime, 1000);
    }

}

