class Vue{
    constructor(options){
        // 1. 通过属性保存选项的数据
        this.$options = options || {}
        this.$data = options.data || {}
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el

        // 2. 代理数据
        this._proxyData(this.$data)
        
        //3. 数据劫持,把数据定义为响应式的,检测数据的变化
        new Observer(this.$data)

        //4.编译模版
        new Compiler(this)

    }

    _proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return data[key]
                },
                set(newValue) {
                    if (newValue !== data[key]) {
                        data[key] = newValue
                    }
                }
            })
        })
    }    
}