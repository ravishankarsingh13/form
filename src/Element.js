import React, {Component} from 'react'
import Input from './Input'
import Dropdown from './Dropdown'

class Element extends Component{
    render(){
        switch(this.props.fieldData.type){
            case 'singleLine':
                return(
                        <Input 
                         fieldLabel = {this.props.fieldData.fieldLabel}
                         fieldName = {this.props.fieldData.fieldName}
                         required = {this.props.fieldData.required}
                        />
                )
                case 'dropDown' :
                    return (
                        <Dropdown 
                        fieldLabel = {this.props.fieldData.fieldLabel}
                        fieldName = {this.props.fieldData.fieldName}
                        option = {this.props.fieldData.option}
                        required = {this.props.fieldData.required}
                            />
                    )
                    default :
                return ''
        }
    }
}
export default Element