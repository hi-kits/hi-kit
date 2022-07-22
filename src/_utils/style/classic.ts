/**
 * Classic - class helper functions
 * 
 * Classic.has( elem, 'my-class' ) -> true/false
 * Classic.add( elem, 'my-new-class' )
 * Classic.remove( elem, 'my-unwanted-class' )
 * Classic.toggle( elem, 'my-class' )
 */
export class Classic {
  // ------------------ 构造函数 ------------------
  private static _instance: Classic;
  public static get instance(): Classic {
    if (!this._instance) {
      this._instance = new Classic();
    }
    return this._instance;
  }
  constructor() {
    if ( 'classList' in document.documentElement ) {
      this.has = ( elem, c ) => {
        return elem.classList.contains( c );
      };
      this.add = ( elem, c ) => {
        elem.classList.add( c );
      };
      this.remove = ( elem, c ) => {
        elem.classList.remove( c );
      };
    } else {
      this.has = ( elem, c ) => {
        return this.classReg( c ).test( elem.className );
      };
      this.add = ( elem, c ) => {
        if ( !this.has( elem, c ) ) {
          elem.className = elem.className + ' ' + c;
        }
      };
      this.remove = ( elem, c ) => {
        elem.className = elem.className.replace( this.classReg( c ), ' ' );
      };
    }
  }
  
  // ------------------ 自定义函数 ------------------
  /**
   * 判断是否存在 class
   * @date 7/6/2022 - 3:21:10 PM
   *
   * @type {(elem, c) => boolean}
   */
  has: (elem, c) => boolean;
  
  /**
   * 添加class
   * @date 7/6/2022 - 3:21:38 PM
   *
   * @type {(elem, c) => void}
   */
  add: (elem, c) => void;
  
  /**
   * 删除class
   * @date 7/6/2022 - 3:21:48 PM
   *
   * @type {(elem, c) => void}
   */
  remove: (elem, c) => void;
  /**
   * class验证
   * @param className 
   * @returns 
   */
  classReg( className ): RegExp {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }
  /**
   * class 有则删除，无则添加
   * @param elem 
   * @param c 
   */
  toggle( elem, c ) {
    var fn = this.has( elem, c ) ? this.remove : this.add;
    fn( elem, c );
  }
}