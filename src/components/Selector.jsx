import { useCallback, useMemo, useState } from 'react'
import './Selector.scss'

function Selector(props) {
  const [selected, setSelected] = useState([])
  const selectClick = (value) => {
    if (selected.includes(value)) {
      setSelected((old) => old.filter((x) => x !== value))
    } else {
      setSelected((old) => [...old, value])
    }
  }

  useMemo(() => {
    if (!props.onChange) return
    props.onChange(selected)
  }, [selected, props])

  const confirm = useCallback(() => {
    props.confirm(selected)
  }, [selected, props])
  return (
    <div className="selector-container">
      {props.options.map((x, i) => {
        return (
          <div
            key={i}
            className={(selected.includes(x.value) ? 'active ' : '') + 'selector-tabs'}
            onClick={() => selectClick(x.value)}>
            {x.label}
          </div>
        )
      })}
      <div
        className="confirm-button"
        onClick={confirm}>
        开始
      </div>
    </div>
  )
}

export default Selector
