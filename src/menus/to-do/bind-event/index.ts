/**
 * @description 绑定checkbox元素的事件，入口
 * @author maxinwei
 */

import Editor from '../../../editor/index'
import bindSwitchEvent from './switch-state'
import bindEnterUpEvent from './enter-extension'

/**
 * 绑定事件
 * @param editor 编辑器实例
 */
function bindEvent(editor: Editor) {
    //  checkbox 点击事件
    bindSwitchEvent(editor)
    //  回车事件
    bindEnterUpEvent(editor)
}

export default bindEvent
