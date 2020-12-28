class Proxy{
    constructor(vm){
        this.vm = vm
        this._proxyData(vm.$data)
        this._proxyComputed(vm.$options.computed)
        this._proxyMethod(vm.$options.methods)         
    }
    _proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this.vm, key, {
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
    _proxyComputed(computed) {
        for (let key in computed) {
            Object.defineProperty(this.vm, key, {
                get: (data) => {
                    return computed[key].call(this.vm, data)
                }
            })
        }
    }

    _proxyMethod(methods) {
        for (let key in methods) {
            Object.defineProperty(this.vm, key, {
                get() {
                    return methods[key]
                }
            })
        }
    }
}