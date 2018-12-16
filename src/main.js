import React from 'react'
import ReactDOM from 'react-dom'

import {createForm} from './form.js'
import { get } from 'https';



const NoInput = (props) => <input value={props.value} style={ props.error ? {border:'red 10px solid'} : {}} onChange={e => props.onChange(e.target.value)} />

class App extends React.Component {
    componentWillMount(){
        this.props.form.$data = {name: 3223}
    }

    render() {
        const { form } = this.props
        const { getData, setData, createErr, createItem, check } = form
        const Err = createErr()
        const Item = createItem(key => ({value: getData(key), onChange: v => setData(key, v), error: Err(key, v => v == '1')}))

        return (
            <div>
                  App:  <NoInput {...Item('name1')} />
                  App:  <NoInput {...Item('name2')} />
                  App:  <NoInput {...Item('name3')} />
                  <div>
                      {JSON.stringify(form.$data)}
                  </div>
                  <button onClick={()=> alert(check())}>检查</button>
            </div>
        );
    }
}


const WrapApp = createForm(App)

ReactDOM.render(
    <WrapApp/>, document.getElementById('app')); 