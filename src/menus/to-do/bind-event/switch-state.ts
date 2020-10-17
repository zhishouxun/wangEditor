/**
 * @description 控制checkbox的状态变化，同步更新其属性
 * @author maxinwei
 */
import { DomElement } from '../../../utils/dom-core'
import Editor from '../../../editor/index'

/**
 * 把checkbox的状态，记录到元素的属性上面。这是为了txt.html()方法可以正确显示checkbox的状态。
 * @param $checkbox 复选框元素
 */
function switchCheckbox($checkbox: DomElement) {
    //  若元素当前属性 checked="checked",则删除这个属性。若没有这个属性，则添加这一属性。
    let checked = $checkbox.attr('checked')

    if (!checked) {
        $checkbox.attr('checked', 'checked')
    } else {
        $checkbox.removeAttr('checked')
    }
}

/**
 * 绑定 switchCheckbox 事件
 * @param editor 编辑器实例
 */
function bindSwitchEvent(editor: Editor) {
    // 点击复选框时，改变其属性
    editor.txt.eventHooks.checkboxClickEvents.push(switchCheckbox)
}

export default bindSwitchEvent
