
import _ from 'lodash';
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const createForm = WrappedComponent => class extends Component {

    state = {}

    get $data(){
        return this.state
    }
    
    set $data(state){
        this.setState({...state})
    }

    createItem = (initInfo) => {
        return (name) => ({ ...initInfo(name)})
    }

    getData = (name) => {
        const pathList = name.split('.')
        let value = pathList.reduce( (state, key ) => {
            state = state[key] || ''
            return state
        } , this.state)
        return value
    }

    setData = (name, value) => {
        const state = {...this.state}
        const pathList = name.split('.')
        let tmp = state 
        pathList.map(k => (tmp[k] instanceof Object) ? tmp = tmp[k] : tmp[k] = value)
        this.setState({...state})
    }

    render() {
        const form = {
            createItem: this.createItem,
            $data: this.$data,
            getData: this.getData,
            setData: this.setData
        }
        return <WrappedComponent {...{form}} />
    }
}

export { createForm }
