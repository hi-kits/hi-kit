/*!
 * EventUtil - event helper functions
 * 
 * EventUtil.addHandler( element, 'click', function )
 */
export class  EventUtil {
    addHandler(element, type, handler) {
        element.addEventListener ? element.addEventListener(type, handler, false) :
            element.attachEvent ? element.attachEvent('on' + type, handler) :
                element['on' + type] = handler;
    }
}