/*!
 * EventUtil - event helper functions
 * 
 * EventUtil.addHandler( element, 'click', function )
 */
export const  EventUtil = {
    /**
     * 添加时间处理
     * @param element 元素
     * @param type 事件类型 例如： click、 change
     * @param handler 事件执行的函数
     */
    addHandler(element: any, type: string, handler: (ev) => void ): void {
        element!.addEventListener ? element!.addEventListener(type, handler, false) :
            element!.attachEvent ? element!.attachEvent('on' + type, handler) :
                element!['on' + type] = handler;
    }
}