import Editor from '../../../editor/index'
import $ from '../../../utils/dom-core'
import { createTodo, isTodo } from '../create-todo-node'

/**
 * todolist 内部逻辑
 * @param editor
 */
function bindEvent(editor: Editor) {
    function todoEnter(e: Event) {
        const $topSelectElem = editor.selection.getSelectionRangeTopNodes(editor)[0]
        const $newTodo = createTodo()
        const $newTodoChildren = $newTodo.childNodes()?.getNode() as Node

        // 判断是否为todo节点
        if (isTodo(editor)) {
            e.preventDefault()
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
