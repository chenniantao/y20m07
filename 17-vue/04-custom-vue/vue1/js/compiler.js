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
            if (node.childNodes && node.childNodes.length) {
                this.compile(node)
            }
        })
    }
    // 判断节点是否是文本节点
    isTextNode(node) {
        return node.nodeType === 3
    }
    compileText(node) {
        let reg = /\{\{(.+?)\}\}/
        let value = node.textContent
        if (reg.test(value)) {
            let key = RegExp.$1.trim()
            node.textContent = value.replace(reg, this.vm[key])
        }
    }            
}