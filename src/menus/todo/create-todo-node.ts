import $, { DomElement } from '../../utils/dom-core'

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
        `<ul style="margin:0;"><li style="list-style:none;"><input type="checkbox">${content}</li></ul>`
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

    $targetElem.on('keyup', (e: KeyboardEvent) => {
        if (e.keyCode !== 13) return
    })

    return $targetElem
}

export default createTodo
