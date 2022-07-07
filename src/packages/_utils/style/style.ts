
/**
 * Style - style helper functions
 * 
 * Style(elem)('width', '20px')
 * Style(elem)({'width':'20px', 'height': '20px'})
 */
// 类型文件
import { isObject } from "../types";
/**
 * 样式助手
 * @param selector 需要处理的元素
 * @returns 
 */
export function Style(selector: any): (props: any, value?: string) => void {
    return (props: any, value?: string) => {
        if(isObject(props)){
            for(var prop in props){
                selector!.style[prop] = props[prop];
            }
        }
        if( typeof props === 'string'){
            selector!.style[props] = value;
        }
    }
}