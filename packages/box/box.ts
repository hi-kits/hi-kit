/**
 * Box
 * @class: Box
 * @version 0.0.1
 * @author by fico on 2022/04/27
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

import { HIElement, customElement, attr, html } from 'hi-element';
import { BoxStyles as styles } from "./box.style";

const template = html<Box>`

<div class="Box">
		<div class="BoxUserInfo">
		<div class="BoxHeader NoBorder">
			<div class="Avatar"></div>
			<div class="Name">姓名</div>
			<div class="Date">12/20 13:47</div>
		</div>
		</div>
		<div class="BoxHeaderPic">
			<div class="BoxHeader NoBorder" valign="bottom">
				<div class="BoxMedia">
					<div class="BoxMediaTitle">山之旅</div>
					<div class="BoxMediaSub">山之旅</div>
				</div>
			</div>
		</div>
		<div class="BoxContent">
        <div class="BoxContentInner">
        <p>我昨天拍了一张漂亮的照片！</p>
            <img src="images/03.jpg" width="100%" class="Img">
            <p class="CA">喜欢：112   评论：43</p>
        </div>
		</div>
		<div class="BoxFooter NoBorder">
			<a href="javascript:;" class="Link">喜欢</a>
			<a href="javascript:;" class="Link">评论</a>
			<a href="javascript:;" class="Link">更多</a>
		</div>
	</div>
`;
@customElement({
   name: 'h-box',
   template,
   styles
})
export class Box extends HIElement {

    @attr disabled = false;
    @attr checked = true;
    isfocus;
    value;
    
    focus() {
        // this.focus();
    }
    connectedCallback() {
        super.connectedCallback()
        this.disabled = this.disabled;
        this.checked = this.checked;
        this.shadowRoot!.addEventListener('change',(ev)=>{
            this.checked = this.checked;
            this.dispatchEvent(new CustomEvent('change', {
                detail: {
                    checked: this.checked
                }
            }));
        })
        this.shadowRoot!.addEventListener('keydown', (ev) => {
            switch (ev['keyCode']) {
                case 13://Enter
                    this.checked = !this.checked;
                    break;
                default:
                    break;
            }
        })
        this.shadowRoot!.addEventListener('focus',(ev)=>{
            ev.stopPropagation();
            if(!this.isfocus){
                this.dispatchEvent(new CustomEvent('focus',{
                    detail:{
                        value:this.value
                    }
                }));
            }
        })
        this.shadowRoot!.addEventListener('blur',(ev)=>{
            ev.stopPropagation();
            if(Number(getComputedStyle(this).zIndex)==2){
                this.isfocus = true;
            }else{
                this.isfocus = false;
                this.dispatchEvent(new CustomEvent('blur',{
                    detail:{
                        value:this.value
                    }
                }));
            }
        })
    }


    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'disabled'){
            if(newValue!==null && this.shadowRoot){
                this.setAttribute('disabled', 'disabled');
            }else{
                this.removeAttribute('disabled');
            }
        }
        if( name == 'checked'){
            if(newValue!==null && this.shadowRoot){
                this.checked = true;
            }else{
                this.checked = false;
            }
        }
    }
}

