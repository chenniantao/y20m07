//观察者(订阅者)
let uid = 0
class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm
        this.key = key
        this.cb = cb//具体的更新操作
        this.id = ++uid
        // 把watcher对象记录到Dep类的静态属性target
        Dep.target = this
        // 触发get方法，在get方法中会调用addSub
        this.oldValue = vm[key]
        this.newValue = ''
        Dep.target = null
    }
    //观察者被通知时的调用update()方法更新
    update(){
        this.newValue = this.vm[this.key]
        this.cb(this.newValue)
    }
}