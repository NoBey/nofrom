import React from 'react'
import ReactDOM from 'react-dom'

import {createForm} from './form.js'



const NoInput = (props) => <input value={props.value} style={ props.error ? {border:'red 10px solid'} : {}} onChange={e => props.onChange(e.target.value)} />

class App extends React.Component {
    componentWillMount(){
        this.props.form.$data = {name: 3223}
    }
    render() {
        const { form } = this.props
        const { getData, setData } = form
        const Item = form.createItem(name => ({value: getData(name), onChange: v => setData(name, v)}))
        return (
            <div>
                  App:  <NoInput {...Item('name')} />
                  <div>
                      {JSON.stringify(form.$data)}
                  </div>
            </div>
        );
    }
}


const WrapApp = createForm(App)

ReactDOM.render(
    <WrapApp/>, document.getElementById('app')); 