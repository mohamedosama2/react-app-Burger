import React from 'react'
import classes from './Input.css'

const Input = (props) => {
    let Element = null
    const classesArr=[classes.inputElement]
    if(props.inValid &&props.hasValidity && props.touched){
        classesArr.push(classes.Invalid)
    }

    switch (props.elementType) {
        case ('input'):
            Element =
                <input
                    className={classesArr.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    />
            break;
        case ('textarea'):
            Element =
                <textarea
                    className={classesArr.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    />
            break;
        case ('select'):
            Element =
                <select
                    className={classesArr.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                    >
                        {
                            props.elementConfig.options.map(option=>(
                                <option key={option.value} value={option.value}>{option.displayValue} </option>
                            ))
                        }
                </select>
            break;
        default: Element =
            <input
                className={classesArr.join(' ')}
                {...props.elementConfig}
                value={props.value} />
    }
    return (
        <div className={classes.Input}>
            <label className={classes.label}> {props.label} </label>
            {Element}
        </div>
    )
}
export default Input