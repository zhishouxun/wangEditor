import $, { DomElement } from '../../utils/dom-core'
import Editor from '../../editor'

/**
 * 创建一个todo元素节点
 * @param editor 编辑器实例
 */
function createTodo($childElem?: DomElement): DomElement {
    let checked = false
    let content: DomElement = $childElem?.childNodes()?.clone(true) as DomElement

    const $targetElem = $(
        `<ul style="margin:0;"><li style="list-style:none;"><input type="checkbox" style="margin-right:3px;"></li></ul>`
    )
    const input = $targetElem.childNodes()?.childNodes()?.getNode()
    const $input = $(input)
    if (content) {
        content.insertAfter($input)
    }

    // 设置checkbox点击状态的保存
    $input.on('click', () => {
        if (checked) {
            $input?.removeAttr('checked')
        } else {
            $input?.attr('checked', '')
        }
        checked = !checked
    })

    return $targetElem
}

/**
 * 判断是否为Todo节点
 * @param todo 需要判断的节点
 */
function isTodo(editor: Editor) {
    const $topSelectElem = editor.selection.getSelectionRangeTopNodes(editor)[0] as DomElement
    const topName = $topSelectElem?.getNodeName()
    // input所在的dom节点位置
    const childName = $topSelectElem.childNodes()?.childNodes()?.getNodeName()
    console.log(topName)

    return topName === 'UL' && childName == 'INPUT'
}

export { createTodo, isTodo }
