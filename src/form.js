
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

    createErr = () => {
        this.$errData = {}
        return (name, errFun) => {
            const v = this.getData(name)
            const tmp = v => v => errFun(v)
            this.$errData[name] = {
                value: errFun(v),
                errFun: tmp(v)
            }
            return this.$errData[name].value
        }
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

    check = () => {
        const errData = this.$errData
        if(errData){
            for (let key in errData) {
                if (errData.hasOwnProperty(key)) {
                   if(errData[key].value) return false
                }
            }
            return true
        }else{
            return true
        }
    }

    render() {
        const form = {
            createItem: this.createItem,
            $data: this.$data,
            getData: this.getData,
            setData: this.setData,
            $errData: this.$errData,
            createErr: this.createErr,
            check: this.check
        }
        return <WrappedComponent {...{form}} />
    }
}

export { createForm }
