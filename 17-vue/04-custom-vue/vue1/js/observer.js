class Observer{
    constructor(data){
        this.walk(data) 
    }
    walk(data) {
        //判断数据是否为对象
        if (!data || typeof data !== 'object') {
            return
        }
        //将数据定义为响应式
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }
    //定义数据为响应式
    defineReactive(data, key, val) {
        let _this = this
        this.walk(val)
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                return val
            },
            set(newValue) {
                if (newValue !== val) {
                    val = newValue
                    _this.walk(newValue)
                }
            }
        })
    }    
}