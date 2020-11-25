import Editor from '../../../editor/index'
import $, { DomElement } from '../../../utils/dom-core'
import createTodo from '../create-todo-node'

/**
 * todolist 内部逻辑
 * @param editor
 */
function bindEvent(editor: Editor) {
    function todoEnter(e: Event) {
        const $selectElem = editor.selection.getSelectionContainerElem() as DomElement
        const $selectChildren = $selectElem?.children()
        const $topSelectElem = editor.selection.getSelectionRangeTopNodes(editor)[0]
        const topName = $topSelectElem.getNodeName()
        const $newTodo = createTodo()
        const $newTodoChildren = $newTodo.childNodes()?.getNode() as Node

        e.preventDefault()

        // 判断是否为todo节点
        if (topName === 'UL' && $selectChildren?.getNodeName() == 'INPUT') {
            if ($topSelectElem.text() === '') {
                $(`<p><br></p>`).insertAfter($topSelectElem)
                $topSelectElem.remove()
                return
            }
            $newTodo.insertAfter($topSelectElem)
            editor.selection.moveCursor($newTodoChildren)
        }
    }

    editor.txt.eventHooks.enterDownEvents.push(todoEnter)
}

export default bindEvent
