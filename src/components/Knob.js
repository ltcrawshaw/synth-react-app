import React, { useState } from 'react'
import { Donut } from 'react-dial-knob'

export default function Knob() {
    const [value, setValue] = useState(0)
    return <Donut
        diameter={100}
        min={0}
        max={100}
        step={1}
        value={value}
        theme={{
            donutColor: 'grey'
        }}
        onValueChange={setValue}
        ariaLabelledBy={'my-label'}
    >
        <label id={'my-label'}>Volume</label>
    </Donut>
}