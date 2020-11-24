import $, { DomElement } from '../../utils/dom-core'
import BtnMenu from '../menu-constructors/BtnMenu'
import Editor from '../../editor/index'
import { MenuActive } from '../menu-constructors/Menu'
import createTodo from './create-todo-node'

class Todo extends BtnMenu implements MenuActive {
    constructor(editor: Editor) {
        const $elem = $(
            `<div class="w-e-menu">
                    <i class="w-e-icon-quotes-left"></i>
                </div>`
        )
        super($elem, editor)
    }

    /**
     * 点击事件
     */
    public clickHandler(): void {
        const editor = this.editor
        const topNodeElem: DomElement[] = editor.selection.getSelectionRangeTopNodes(editor)
        const $topNodeElem: DomElement = topNodeElem[topNodeElem.length - 1]
        const nodeName = $topNodeElem?.getNodeName()
        if (nodeName === 'P') {
            const todoNode = createTodo($topNodeElem)
            todoNode.insertAfter($topNodeElem)
            $topNodeElem.remove()
        }
    }
    tryChangeActive() {}
}

export default Todo
