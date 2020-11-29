import createEditor from '../fns/create-editor'
import Editor from '../../src/editor/index'
import disableInit from '../../src/editor/disable'

let editor: Editor

describe('Editor disable', () => {
    beforeEach(() => {
        editor = createEditor(document, 'div1')
    })

    test('编辑器可以被禁用', () => {
        const disabledObj = disableInit(editor)

        disabledObj.disable()

        expect(editor.$textElem.elems[0].style.display).toBe('none')
    })

    test('编辑器禁用后通过js修改内容，change hook监听会触发', done => {
        const changeFn = jest.fn(() => {
            done()
        })

        editor.disable()

        editor.txt.eventHooks.changeEvents.push(changeFn)

        editor.txt.html(`<span>123</span>`)
    })

    test('编辑器禁用后可以取消禁用', () => {
        const disabledObj = disableInit(editor)

        disabledObj.disable()

        expect(editor.$textElem.elems[0].style.display).toBe('none')

        disabledObj.enable()

        expect(editor.$textElem.elems[0].style.display).toBe('block')
    })
})
