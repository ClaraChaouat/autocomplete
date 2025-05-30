import { getKeyDownHandler } from './listNavigationHandler'
import type { SuggestionItem } from '../types'

const suggestions: SuggestionItem[] = [
    { id: 1, name: 'France' },
    { id: 2, name: 'Spain' },
    { id: 3, name: 'Italy' },
]

const makeEvent = (key: string) =>
({
    key,
    preventDefault: jest.fn(),
} as unknown as React.KeyboardEvent<HTMLInputElement>)

describe('getKeyDownHandler', () => {
    let setActiveIndex: jest.Mock
    let onSelect: jest.Mock
    let setIsOpen: jest.Mock
    let setInputValue: jest.Mock

    beforeEach(() => {
        setActiveIndex = jest.fn()
        onSelect = jest.fn()
        setIsOpen = jest.fn()
        setInputValue = jest.fn()
    })

    it('ignores key events if dropdown is closed', () => {
        const handler = getKeyDownHandler({
            isOpen: false,
            suggestions,
            activeIndex: 1,
            setActiveIndex,
            onSelect,
            setIsOpen,
            setInputValue,
        })
        const event = makeEvent('ArrowDown')
        handler(event)
        expect(setActiveIndex).not.toHaveBeenCalled()
        expect(onSelect).not.toHaveBeenCalled()
    })

    it('handles ArrowDown key', () => {
        const handler = getKeyDownHandler({
            isOpen: true,
            suggestions,
            activeIndex: 0,
            setActiveIndex,
            onSelect,
            setIsOpen,
            setInputValue,
        })
        const event = makeEvent('ArrowDown')
        handler(event)
        expect(event.preventDefault).toHaveBeenCalled()
        expect(setActiveIndex).toHaveBeenCalledWith(expect.any(Function))

    })

    it('handles ArrowUp key', () => {
        const handler = getKeyDownHandler({
            isOpen: true,
            suggestions,
            activeIndex: 1,
            setActiveIndex,
            onSelect,
            setIsOpen,
            setInputValue,
        })
        const event = makeEvent('ArrowUp')
        handler(event)
        expect(event.preventDefault).toHaveBeenCalled()
        expect(setActiveIndex).toHaveBeenCalledWith(expect.any(Function))
    })

    it('handles Enter key and selects current item', () => {
        const handler = getKeyDownHandler({
            isOpen: true,
            suggestions,
            activeIndex: 1,
            setActiveIndex,
            onSelect,
            setIsOpen,
            setInputValue,
        })
        const event = makeEvent('Enter')
        handler(event)
        expect(event.preventDefault).toHaveBeenCalled()
        expect(setInputValue).toHaveBeenCalledWith('Spain')
        expect(onSelect).toHaveBeenCalledWith(suggestions[1])
        expect(setIsOpen).toHaveBeenCalledWith(false)
    })

    it('handles Enter key and does nothing if activeIndex is -1', () => {
        const handler = getKeyDownHandler({
            isOpen: true,
            suggestions,
            activeIndex: -1,
            setActiveIndex,
            onSelect,
            setIsOpen,
            setInputValue,
        })
        const event = makeEvent('Enter')
        handler(event)
        expect(onSelect).not.toHaveBeenCalled()
        expect(setInputValue).not.toHaveBeenCalled()
    })

    it('handles Escape key', () => {
        const handler = getKeyDownHandler({
            isOpen: true,
            suggestions,
            activeIndex: 1,
            setActiveIndex,
            onSelect,
            setIsOpen,
            setInputValue,
        })
        const event = makeEvent('Escape')
        handler(event)
        expect(event.preventDefault).toHaveBeenCalled()
        expect(setIsOpen).toHaveBeenCalledWith(false)
    })

    it('handles Tab key and selects item if activeIndex >= 0', () => {
        const handler = getKeyDownHandler({
            isOpen: true,
            suggestions,
            activeIndex: 2,
            setActiveIndex,
            onSelect,
            setIsOpen,
            setInputValue,
        })
        const event = makeEvent('Tab')
        handler(event)
        expect(setInputValue).toHaveBeenCalledWith('Italy')
        expect(onSelect).toHaveBeenCalledWith(suggestions[2])
        expect(setIsOpen).toHaveBeenCalledWith(false)
    })

    it('handles Tab key and closes if activeIndex < 0', () => {
        const handler = getKeyDownHandler({
            isOpen: true,
            suggestions,
            activeIndex: -1,
            setActiveIndex,
            onSelect,
            setIsOpen,
            setInputValue,
        })
        const event = makeEvent('Tab')
        handler(event)
        expect(onSelect).not.toHaveBeenCalled()
        expect(setIsOpen).toHaveBeenCalledWith(false)
    })
})
