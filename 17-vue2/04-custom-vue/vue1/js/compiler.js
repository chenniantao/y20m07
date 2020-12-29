class Compiler{
    constructor(vm){
        this.el = vm.$el
        this.vm = vm
        // 把当前节点中的元素获取到，放入内存中
        let fragment = this.node2fragment(this.el)
        // 编译模版
        this.compile(fragment)
        // 把编译后的内容替换原来页面
        this.el.appendChild(fragment)        
    }
    // 把节点移入到内存中
    node2fragment(node) {
        // 创建一个节点片段
        let fragment = document.createDocumentFragment()
        let firstChild;
        while (firstChild = node.firstChild) {
            // appendChild具有移动性
            fragment.appendChild(firstChild)
        }
        return fragment
    }
    compile(el) {
        let childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            if (this.isTextNode(node)) {
                this.compileText(node)
            }
            if (this.isElementNode(node)) {
                this.compileElement(node)
            }               
            if (node.childNodes && node.childNodes.length) {
                this.compile(node)
            }
        })
    }
    // 判断节点是否是文本节点
    isTextNode(node) {
        return node.nodeType === 3
    }
    // 判断节点是否是元素节点
    isElementNode(node) {
        return node.nodeType === 1
    }      
    compileText(node) {
        let reg = /\{\{(.+?)\}\}/
        let value = node.textContent
        if (reg.test(value)) {
            let key = RegExp.$1.trim()
            node.textContent = value.replace(reg, this.vm[key])
            //实例化一个观察者
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue
            })
        }
    }
    compileElement(node) {
        Array.from(node.attributes).forEach(attr => {
            let attrName = attr.name
            if (this.isDirective(attrName)) {
                //获取指令的名称如: v-text --> text
                attrName = attrName.substr(2)
                let eventName = ''
                if (this.isEventDirective(attrName)) {
                    [attrName, eventName] = attrName.split(':')
                }
                let key = attr.value
                this.update(node, key, attrName, eventName)
            }
        })
    }
    // 判断元素属性是否是指令
    isDirective(attrName) {
        return attrName.startsWith('v-')
    }
    // 判断是否是绑定事件指令
    isEventDirective(attrName) {
        return attrName.indexOf(':') !== -1
    }
    update(node, key, attrName, eventName) {
        let updateFn = this[attrName + 'Updater']
        updateFn && updateFn.call(this, node, this.vm[key], key, eventName)
    }
    //v-text
    textUpdater(node, value, key) {
        node.textContent = value
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue
        })
    }
    //v-model
    modelUpdater(node, value, key) {
        node.value = value

        new Watcher(this.vm, key, (newValue) => {
            node.value = newValue
        })
        // 双向绑定
        node.addEventListener('input', () => {
            this.vm[key] = node.value
        })
    }
    //v-html
    htmlUpdater(node, value, key) {
        node.innerHTML = value
        new Watcher(this.vm, key, (newValue) => {
            node.innerHTML = newValue
        })
    }
    //v-on
    onUpdater(node, value, key, eventName) {
        node.addEventListener(eventName, value.bind(this.vm))
    }                           
}