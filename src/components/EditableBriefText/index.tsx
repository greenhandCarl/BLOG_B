import { FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_SUFFIX } from '@/const'
import { getElemContentWidth } from '@/util'
import styles from './index.module.scss'

const {
    container,
    textInput,
    textSpan,
} = styles

type Prop = {
    suffix?: string,
    value: string,
}

function getDisplayWidth (elem: HTMLElement) {
    return getElemContentWidth(elem);
}

const EditableBriefText: FC<Prop> = (props: Prop) => {
    const { value: originalVal = '', suffix = DEFAULT_SUFFIX } = props
    const inputRef = useRef<HTMLInputElement | null>(null)
    const spanRef = useRef<HTMLSpanElement | null>(null)
    const [value, setValue] = useState<string>(originalVal)
    const [focused, setFocused] = useState<boolean>(false)

    useEffect(() => {
        initializeElement()
        showInput()
    }, [])

    const initializeElement = useCallback(() => {
        syncSpanValueAndInputWidth(value)
    }, [value])

    const syncSpanValueAndInputWidth = useCallback((value: string) => {
        if (inputRef.current && spanRef.current) {
            spanRef.current.textContent = value
            const spanWidth = getDisplayWidth(spanRef.current)
            inputRef.current.style.width = `${spanWidth}px`
        }
    }, [spanRef, inputRef])

    const switchDisplayElem = (elemShowed: HTMLElement, elemHidden: HTMLElement) => {
        elemShowed.style.backgroundColor = '#ffffff'
        elemShowed.style.color = 'initial'
        elemHidden.style.backgroundColor = 'transparent'
        elemHidden.style.color = 'transparent'
    }

    const showInput = useCallback(() => {
        if (inputRef.current && spanRef.current) {
            switchDisplayElem(inputRef.current, spanRef.current)
        }
    }, [inputRef, spanRef])

    const hiddenInput = useCallback(() => {
        if (inputRef.current && spanRef.current) {
            switchDisplayElem(spanRef.current, inputRef.current)
        }
    }, [inputRef, spanRef])

    const handleChange = useCallback((e: FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        syncSpanValueAndInputWidth(e.currentTarget.value)
    }, [inputRef, spanRef])

    const handleFocus = useCallback(() => {
        setFocused(true)
        showInput()
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [inputRef])

    const handleBlur = useCallback(() => {
        setFocused(false)
        hiddenInput()
    }, [])

    return <div className={container}>
        <input
            ref={inputRef}
            className={textInput}
            type="text"
            maxLength={150}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
        <span
            ref={spanRef}
            className={textSpan}
        >
        </span>
        <span onClick={handleFocus}>{!focused && suffix}</span>
    </div>
}

export default EditableBriefText;