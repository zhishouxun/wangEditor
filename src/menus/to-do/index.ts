/**
 * @description 创建一个待办
 * @author maxinwei
 */

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

        //  todo: 怎么兼容无序列表，是个问题？判断是否已经执行了命令
        if (editor.cmd.queryCommandState('insertUnorderedList')) {
            return
        }

        //  todo: 这里应该写屏蔽代码。比如当选区是代码域，图片等时，阻止插入待办。

        //  确定要插入的话，先插入一个无序列表。
        editor.cmd.do('insertUnorderedList')

        // 确保$dom为列表元素<ul>
        let $selectionElem = $(editor.selection.getSelectionContainerElem()) // 返回当前元素
        let $dom = $selectionElem
        let checkbox: String = '<span contenteditable="false"><input type="checkbox"></span>'
        if ($dom.getNodeName() === 'LI') {
            //  为当前列表项插入一个checkbox框
            let content: HTMLElement | string = $dom.html()
            $dom.html(checkbox + content)
            let $domParent = $dom.parent()
        } else if ($dom.getNodeName() === 'UL') {
            //  为每个列表项插入一个checkbox框
            //  todo:这里有一个问题，当同时选中文本区和待办区，会给待办区再插入一次checkbox
            $dom.childNodes()?.forEach(function (elem: DomElement) {
                let $elem = $(elem)
                let content: HTMLElement | string = $elem.html()
                $elem.html(checkbox + content)
            })
            let $domParent = $dom
        } else {
            alert('error')
        }

        //todo: 更改列表样式，使得列表项之前的小圆点不显示。当然别忘了验证这个样式是内联样式。
        //todo: 让光标在移动过程中忽略checkbox。

        //  验证列表是否被包裹在 <p> 之内
        //  todo:  有选区的话这里代码无效。
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
     * todo: 这里问题是，光标只有动一下才能正常高亮，除非本行的邻行已经是待办了，那么此时正常。
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

export default Todo
