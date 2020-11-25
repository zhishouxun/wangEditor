import $, { DomElement } from '../../utils/dom-core'
import Editor from '../../editor'

/**
 * 创建一个todo元素节点
 * @param editor 编辑器实例
 */
function createTodo($childElem?: DomElement): DomElement {
    let content = ''
    let checked = false
    if ($childElem) {
        content = $childElem.text()
    }
    const $targetElem = $(
        `<ul style="margin:0;"><li style="list-style:none;"><input type="checkbox" style="margin-right:3px;">${content}</li></ul>`
    )

    // 设置checkbox点击状态的保存
    $targetElem.on('click', () => {
        const $input = $targetElem.children()?.childNodes()
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
    const $selectElem = editor.selection.getSelectionContainerElem() as DomElement
    const $selectChildren = $selectElem?.children()
    const $topSelectElem = editor.selection.getSelectionRangeTopNodes(editor)[0]
    const topName = $topSelectElem.getNodeName()
    console.log(topName)
    console.log($selectChildren?.getNodeName())

    return topName === 'UL' && $selectChildren?.getNodeName() == 'INPUT'
}

export { createTodo, isTodo }
