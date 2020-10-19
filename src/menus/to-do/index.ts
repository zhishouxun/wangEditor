/**
 * @description 创建一个待办
 * @author maxinwei
 */

// TODO 复制待办，再粘贴会出大问题。

import BtnMenu from '../menu-constructors/BtnMenu'
import $, { DomElement } from '../../utils/dom-core'
import Editor from '../../editor/index'
import { MenuActive } from '../menu-constructors/Menu'
import bindEvent from './bind-event/index'

class Todo extends BtnMenu implements MenuActive {
    constructor(editor: Editor) {
        const $elem = $(
            `<div class="w-e-menu">
                <i class="w-e-icon-checkbox-checked"></i>
            </div>`
        )
        super($elem, editor)
        // 绑定事件，点击checkbox时，同步更新其属性"checked"
        bindEvent(editor)
    }

    /**
     * 点击事件
     */
    public clickHandler(): void {
        const editor = this.editor
        const $textElem = editor.$textElem
        editor.selection.restoreSelection()

        // TODO: 怎么兼容无序列表，是个问题。我没有考虑待办和无序列表的切换。

        // 判断是否已经执行了命令
        if (editor.cmd.queryCommandState('insertUnorderedList')) {
            return
        }

        // TODO: 这里应该写屏蔽代码。比如当选区是代码域，图片等时，阻止插入待办。

        // 确定要插入的话，先插入一个无序列表。
        editor.cmd.do('insertUnorderedList')

        // 在每个列表项li内插入首个子节点checkbox
        let $selectionElem = $(editor.selection.getSelectionContainerElem()) // 返回当前元素
        let $dom = $selectionElem

        if ($dom.getNodeName() === 'LI') {
            //  为当前列表项插入一个checkbox框
            insertCheckbox($dom)
            let $domParent = $dom.parent()
        } else if ($dom.getNodeName() === 'UL') {
            //  为每个列表项插入一个checkbox框
            $dom.childNodes()?.forEach(function (elem: DomElement) {
                let $elem = $(elem)
                // 当选区前半部分是文本区，后半部分是待办区，防止重复的插入checkbox
                if ($elem.firstChild()?.elems[0]) {
                    if ($elem.firstChild()?.firstChild()?.getNodeName() !== 'INPUT') {
                        insertCheckbox($elem)
                    }
                } else {
                    insertCheckbox($elem)
                }
            })
            let $domParent = $dom
        } else {
            // TODO 我只考虑2中文本域和待办域混杂的情况。1是前半部分是文本区，后半部分是待办区，已在前面考虑过。
            // 另一是前半部分是待办区，后半部分是文本区，暂时还没写这个代码。
            alert('error')
        }

        //TODO: 更改列表样式，使得列表项之前的小圆点不显示。当然别忘了验证这个样式应该是是内联样式。
        //TODO: 让光标在移动过程中忽略checkbox。现在光标会位移到checkbox左侧，这不应该。
        //TODO: 设置checkbox的样式，如设置和右侧文字的距离。

        //  验证列表是否被包裹在 <p> 之内
        //  BUG 有选区的话这里代码无效，依然会被一个p标签包裹。
        if ($selectionElem.getNodeName() === 'LI') {
            $selectionElem = $selectionElem.parent()
        }

        if (/^ol|ul$/i.test($selectionElem.getNodeName()) === false) {
            return
        }

        if ($selectionElem.equal($textElem)) {
            // 证明是顶级标签，没有被 <p> 包裹
            return
        }

        const $parent = $selectionElem.parent()
        if ($parent.equal($textElem)) {
            // $parent 是顶级标签，不能删除
            return
        }

        $selectionElem.insertAfter($parent)
        $parent.remove()

        // 恢复选区
        editor.selection.restoreSelection()
        this.tryChangeActive()
    }

    /**
     * 尝试修改菜单激活状态
     * TODO: 这里问题是，光标只有动一下才能正常高亮，除非本行的邻行已经是待办了，那么此时正常。
     * 我尝试用保存恢复选区的方法解决这个问题，但是不行，可能因为我整个替换了选区的html内容。
     */
    public tryChangeActive(): void {
        const editor = this.editor
        const $selectionElem = editor.selection.getSelectionStartElem()
        const $selectionStartElem = $($selectionElem).getNodeTop(editor)
        const regUl = /^UL$/i
        if ($selectionStartElem.length <= 0) return
        if (regUl.test($selectionStartElem.getNodeName())) {
            this.active()
        } else {
            this.unActive()
        }
    }
}

/**
 * @description 插入checkbox
 * @author maxinwei
 */
function insertCheckbox(dom: DomElement): void {
    let checkbox: string = '<span contenteditable="false"><input type="checkbox"></span>'
    let content: HTMLElement | string = dom.html()
    dom.html(checkbox + content)
}

export default Todo
