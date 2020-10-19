/**
 * @description 实现：用回车键可以新建待办项，条件是按下回车之前，光标所在位置本身是一个待办项
 * @author maxinwei
 */
import $, { DomElement } from '../../../utils/dom-core'
import Editor from '../../../editor/index'

let _editor: Editor
/**
 * 回车键，新建待办。若光标所在位置是li标签之内，且当前li标签的前一个li标签的第一个子元素是input元素（checkbox）
 * 则给光标当前位置添加childNode:checkbox
 */
function extension() {
    let editor: Editor = _editor
    let dom = $(editor.selection.getSelectionContainerElem())

    // 检查当前光标是否在待办列表内
    if (dom.getNodeName() !== 'LI') return
    let preNode = dom.prev()
    let preNodeFirstChild = preNode.firstChild()?.firstChild()
    if (preNodeFirstChild?.getNodeName() !== 'INPUT') return

    // 添加checkbox子元素
    let checkbox: string = '<span contenteditable="false"><input type="checkbox"></span>'
    editor.cmd.do('insertHTML', checkbox)

    // TODO: 把光标位置调到checkbox之后，现在在checkbox之前。事实上插入待办也会有这个问题。
    // var range = document.createRange();
    // range.setStart($(checkbox).firstChild(), 0);
    // range.setEnd(myDiv, 0);
}

/**
 * 绑定 switchCheckbox 事件
 * @param editor 编辑器实例
 */
function bindEnterUpEvent(editor: Editor) {
    _editor = editor
    // 点击复选框时，改变其属性
    editor.txt.eventHooks.enterUpEvents.push(extension)
}

export default bindEnterUpEvent
