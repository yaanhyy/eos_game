import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';

ScatterJS.plugins(new ScatterEOS());

const network = {
    blockchain: 'eos',
    protocol: 'http',
    host: '127.0.0.1',
    port: 7777,
    chainId:         'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
}
//ReactDOM.render(<App />, document.getElementById('root'));
class HelloMessage extends React.Component {


    componentDidMount()
    {
        setTimeout(() => {
            this.init()
        }, 2000)
    }

    init()
    {
        ScatterJS.scatter.connect('eos').then(connected => {
            if (!connected) return false;
            const scatter = ScatterJS.scatter;

            this.setState({
                scatter
            });
            alert("scatter load success")
        });
    }

    createTodo()
    {
        this.state.scatter.getIdentity({accounts:network}).then(() => {
            const account = this.state.scatter.identity.accounts.find(x => x.blockchain === 'eos');
            const eos = this.state.scatter.eos(network, Eos);
            const transactionPermission = {authorization: [`${account.name}@${account.authority}`]};
            const num = Math.floor(Math.random() * 100000);
            eos.contract(account.name).then(ins => {
                ins.create(account.name, num, "this is " + num, transactionPermission).then(res => {
                    console.log(res)
                })
            })

        }).catch(error => {
            console.error(error);
        });
    }
    render() {
        return (
            <div>
                Hello {this.props.name}
                bye {this.props.bye}
                <div>
                    <button onClick={() => this.createTodo()}>create todo</button>
                    <button onClick={() => this.deleteTodo()}>delete todo</button>
                    <input type="text" onChange={e => {
                        this.setState({
                            deleteId: Number.parseInt(e.target.value)
                        })
                    }}/>

                    <button onClick={() => this.completeTodo()}>complete todo</button>
                    <input type="text" onChange={e => {
                        this.setState({
                            competedId: Number.parseInt(e.target.value)
                        })
                    }}/>
                    <button onClick={() => this.showTodo()}>show todo</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <HelloMessage name="Taylor" bye={"Chuan"}/>,
    document.getElementById("head")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();





