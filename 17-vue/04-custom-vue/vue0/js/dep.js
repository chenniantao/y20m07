//目标(发布者)
class Dep {
    constructor() {
        this.subs = []//存储所有的观察者
    }

    addSub(sub) {//添加观察者
        if (sub && sub.update) {
            this.subs.push(sub)
        }
    }

    notify() {//通知所有所有观察者的调用update()方法更新
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}