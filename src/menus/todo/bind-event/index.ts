import Editor from '../../../editor/index'
import $ from '../../../utils/dom-core'
import { createTodo, isTodo } from '../create-todo-node'

/**
 * todolist 内部逻辑
 * @param editor
 */
function bindEvent(editor: Editor) {
    /**
     * todo的自定义回车事件
     * @param e 事件属性
     */
    function todoEnter(e: Event) {
        const $topSelectElem = editor.selection.getSelectionRangeTopNodes(editor)[0]
        const $selectElem = editor.selection.getSelectionContainerElem()
        const cursorPos: number = editor.selection.getCursorPos() as number
        let content
        if ($selectElem?.text().length !== cursorPos && cursorPos > 0) {
            const txt = $selectElem?.text().slice(cursorPos)
            const orginTxt = $selectElem?.text().slice(0, cursorPos) as string
            $selectElem?.text(orginTxt)
            content = $(`<p>${txt}</p>`)
        }
        const $newTodo = createTodo(content)
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
    /**
     * todo的自定义删除事件
     * @param e
     */
    function todoDel(e: Event) {
        if (isTodo(editor)) {
            const $topSelectElem = editor.selection.getSelectionRangeTopNodes(editor)[0]
            if ($topSelectElem.text() === '') {
                e.preventDefault()
                $(`<p><br></p>`).insertAfter($topSelectElem)
                $topSelectElem.remove()
                editor.selection.saveRange()
            }
        }
    }

    editor.txt.eventHooks.enterDownEvents.push(todoEnter)
    editor.txt.eventHooks.deleteDownEvents.push(todoDel)
}

export default bindEvent
