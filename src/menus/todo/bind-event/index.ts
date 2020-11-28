import Editor from '../../../editor/index'
import $ from '../../../utils/dom-core'
import { createTodo, isTodo, isAllTodo } from '../create-todo-node'

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
        // 判断是否为todo节点
        if (isAllTodo(editor)) {
            e.preventDefault()
            const $topSelectElem = editor.selection.getSelectionRangeTopNodes(editor)[0]
            const $selectElem = editor.selection.getSelectionContainerElem()
            const cursorPos: number = editor.selection.getCursorPos() as number
            let content
            // 处理回车后光标有内容的部分
            if ($selectElem?.text().length !== cursorPos && cursorPos > 0) {
                const txt = $selectElem?.text().slice(cursorPos)
                const orginTxt = $selectElem?.text().slice(0, cursorPos) as string
                const textNode = $selectElem?.childNodes()?.getNode(1)
                // 不带样式的文本内容需要特殊处理
                textNode ? (textNode.nodeValue = orginTxt) : $selectElem?.text(orginTxt)
                content = $(`<p>${txt}</p>`)
            }
            const $newTodo = createTodo(content)
            const $newTodoChildren = $newTodo.childNodes()?.getNode() as Node
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
     * @param e 事件属性
     */
    function todoDel(e: Event) {
        const $topSelectElem = editor.selection.getSelectionRangeTopNodes(editor)[0]
        if (isTodo($topSelectElem)) {
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
