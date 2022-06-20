/**
 * @class: HiDrawlottery
 * @version 0.0.1
 * @author by fico on 2022/06/20
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, html, ref } from 'hi-element';
import { DrawlotteryStyles as styles } from "./drawlottery.style";

const template = html<HiDrawlottery>`

<section class="DrawlotteryModel" ${ref("DrawlotteryModel")}>
  <table class="Table" id="lottery">
    <tbody>
      <!-- 九宫格第一行 -->
      <tr>
        <td class="lottery lottery-0">
          <div class="Shadow">
            <section class='giftPic'>
              <img class="Img" src="${x => x.prizeIndexObject[0]?.prizeImg}" />
            </section>

            <p>${x => x.prizeIndexObject[0]?.prizeName}</p>
          </div>
        </td>
        <td class="lottery lottery-1">
          <div class="Shadow">
            <section class='giftPic'>
              <img class="Img" src="${x => x.prizeIndexObject[1]?.prizeImg}" />
            </section>
            <p>${x => x.prizeIndexObject[1]?.prizeName}</p>
          </div>
        </td>
        <td class="lottery lottery-2">
          <div class="Shadow">
            <section class='giftPic'>
              <img class="Img" src="${x => x.prizeIndexObject[2]?.prizeImg}" />
            </section>
            <p>${x => x.prizeIndexObject[2]?.prizeName}</p>
          </div>
        </td>
      </tr>

      <!-- 九宫格第二行 -->
      <tr>
        <td class="lottery lottery-7">
          <div class="Shadow">
            <section class='giftPic'>
              <img class="Img" src="${x => x.prizeIndexObject[7]?.prizeImg}" />
            </section>
            <p>${x => x.prizeIndexObject[7]?.prizeName}</p>
          </div>
        </td>
        <td class="StartWrap">
          <!-- 抽奖按钮 -->
          <div class="Start Shadow"  ${ref('Start')} >

            立即<br/>开奖

          </div>
        </td>
        <td class="lottery lottery-3">
          <div class="Shadow">
            <section class='giftPic'>
              <img class="Img" src="${x => x.prizeIndexObject[3]?.prizeImg}" />
            </section>
            <p>${x => x.prizeIndexObject[3]?.prizeName}</p>
          </div>
        </td>
      </tr>

      <!-- 九宫格第三行 -->
      <tr>
        <td class="lottery lottery-6">
          <div class="Shadow">
            <section class='giftPic'>
              <img class="Img" src="${x => x.prizeIndexObject[6]?.prizeImg}" />
            </section>
            <p>${x => x.prizeIndexObject[6]?.prizeName}</p>
          </div>
        </td>
        <td class="lottery lottery-5">
          <div class="Shadow">
            <section class='giftPic'>
              <img class="Img" src="${x => x.prizeIndexObject[5]?.prizeImg}" />
            </section>
            <p>${x => x.prizeIndexObject[6]?.prizeName}</p>
          </div>
        </td>
        <td class="lottery lottery-4">
          <div class="Shadow">
            <section class='giftPic'>
              <img class="Img" src="${x => x.prizeIndexObject[4]?.prizeImg}" />
            </section>
            <p>${x => x.prizeIndexObject[4]?.prizeName}</p>
          </div>
        </td>
      </tr>

    </tbody>
  </table>
</section>

`;
@customElement({
   name: 'h-drawlottery',
   template,
   styles
})
export class HiDrawlottery extends HIElement {

    @attr disabled = false;
    @attr checked = true;
    DrawlotteryModel: HTMLElement;
    Start: HTMLElement;
    isfocus;
    prizeIndexObject: Array<any> = [
        {
          prizeImg: 'assets/images/home/packet.png',
          // prizeQuota: '7',
          prizeQuota: '88',
          index: 0,
          prizeName: '88海贝'
        },
        {
          prizeImg: 'assets/images/home/packet.png',
          // prizeQuota: '6',
          prizeQuota: '66',
          index: 1,
          prizeName: '66海贝'
        },
        {
          prizeImg: 'assets/images/home/packet.png',
          // prizeQuota: '5',
          prizeQuota: '30',
          index: 2,
          prizeName: '30海贝'
        },
        {
          prizeImg: 'assets/images/home/packet.png',
          // prizeQuota: '4',
          prizeQuota: '15',
          index: 3,
          prizeName: '15海贝'
        },
        {
          prizeImg: 'assets/images/home/packet01.png',
          prizeQuota: '0',
          index: 4,
          prizeName: '再接再厉'
        },
    
        {
          prizeImg: 'assets/images/home/packet.png',
          // prizeQuota: '1',
          prizeQuota: '5',
          index: 5,
          prizeName: '5海贝'
        },
        {
          prizeImg: 'assets/images/home/packet.png',
          // prizeQuota: '2',
          prizeQuota: '10',
          index: 6,
          prizeName: '10海贝'
        },
    
        {
          prizeImg: 'assets/images/home/packet.png',
          // prizeQuota: '3',
          prizeQuota: '20',
          index: 7,
          prizeName: '20海贝'
        },
      ];
    
    focus() {
        // this.focus();
    }
    connectedCallback() {
        super.connectedCallback();
        this.Start.addEventListener('click',()=>{
            
            this.drawlottery({
                'prize': 3,
                'callback': () => {
                  //
                }
              });
        })
        
    }
    // dom元素class名称方法的控制对象
    domClassController = {
        hasClass: (obj, className) => {
        return obj.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        },
        addClass: (obj, className) => {
        if (!this.domClassController.hasClass(obj, className)) {
            obj.className += ' ' + className;
        }
        },
        removeClass: (obj, className) => {
        if (this.domClassController.hasClass(obj, className)) {
            const reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
        },
    }
    private drawlottery(options?) {
        const self = this;
        const defaults = {
          // 当前转动到哪个位置，起点位置
          index: 7,
          // 总共有多少个位置,
          count: 0,
          // setTimeout的ID，用clearTimeout清除
          timer: 0,
          // 初始转动速度
          speed: 20,
          // 转动次数
          times: 0,
          // 转动基本次数：即至少需要转动多少次再进入抽奖环节
          cycle: 50,
          // 中奖位置
          prize: 0,
          // 抽奖回调
          callback: function () { }
        };
        // tslint:disable-next-line:forin
        for (const def in defaults) {
          if (typeof options[def] === 'undefined') {
            options[def] = defaults[def];
          }
        }
        // options = {};
    
        const activeReg = new RegExp('(\\s|^)active(\\s|$)');
        // 定义方法
    
        const Lottery = {
          init: function (id) {
            if (self.DrawlotteryModel.querySelectorAll('.lottery').length > 0) {
              options.obj = self.DrawlotteryModel;
              options.count = options.obj.querySelectorAll('.lottery').length;
              options.speed = 100;
              roll();
            }
          },
          roll: function () {
            let index = options.index;
            const count = options.count;
            const lottery = options.obj;
            self.domClassController.removeClass(lottery.querySelectorAll('.lottery-' + index)[0], 'active');
    
            index += 1;
            if (index > count - 1) {
              index = 0;
            }
            self.domClassController.addClass(lottery.querySelectorAll('.lottery-' + index)[0], 'active');
            options.index = index;
            return false;
          },
          stop: function (index) {
            options.prize = index;
            return false;
          }
        };
    
        function roll() {
          options.times += 1;
          Lottery.roll();
          if (options.times > options.cycle + 10 && options.prize === options.index) {
            clearTimeout(options.timer);
            options.prize = -1;
            options.times = 0;
            setTimeout(() => {
              // self.openResult = 1;
              options.callback();
            }, 200);
          } else {
            if (options.times < options.cycle) {
              options.speed -= 10;
            } else if (options.times === options.cycle) {
              options.prize = options.prize;
            } else {
              if (options.times > options.cycle + 10 && ((options.prize === 0 && options.index === 7) || options.prize === options.index + 1)) {
                options.speed += 110;
              } else {
                options.speed += 20;
              }
            }
            if (options.speed < 40) {
              options.speed = 40;
            }
            options.timer = setTimeout(roll, options.speed);
          }
          return false;
        }
    
        if (this.DrawlotteryModel.querySelectorAll('.active')[0]) {
          self.domClassController.removeClass(this.DrawlotteryModel.querySelectorAll('.active')[0], 'active');
        }
    
        Lottery.init('lottery');
    
      }
   
}

