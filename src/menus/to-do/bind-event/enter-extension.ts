/**
 * @description 实现：用回车键可以新建待办项，条件是按下回车之前，光标所在位置本身是一个待办项
 * @author maxinwei
 */
import $, { DomElement } from '../../../utils/dom-core'
import Editor from '../../../editor/index'

let _editor: Editor
/**
 * 回车键，新建待办。若选区开始的地方或者光标所在位置是li标签之内，且这个li标签的第一个子元素是input元素
 */
function extension() {
    let editor: Editor = _editor
    let dom = $(editor.selection.getSelectionContainerElem())
    console.log(dom)
}

/**
 * 绑定 switchCheckbox 事件
 * @param editor 编辑器实例
 */
function bindenterDownEvent(editor: Editor) {
    _editor = editor
    // 点击复选框时，改变其属性
    editor.txt.eventHooks.enterDownEvents.push(extension)
}

export default bindenterDownEvent
