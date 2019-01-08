import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';
import Web3 from "web3"
ScatterJS.plugins(new ScatterEOS());

const requiredFields = {
    accounts:[
        {blockchain:'eos', host:'127.0.0.1', port:7777, chainId:'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'},
    ]
};


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
        ScatterJS.scatter.connect('eos').then(connected => {
            if (!connected) return false;
            const scatter = ScatterJS.scatter;

            this.setState({
                scatter
            });
            alert("scatter load success")
        });
    }

    ethTodo()
    {
        console.debug("eth todo");
        if (typeof window.ethereum!== 'undefined') {
        //     window.web3.eth.getAccounts(function (err, accounts) {
        //         if (accounts.length == 0) {
        //
        //         }
        //         console.debug(accounts.length);
        //     });
             console.debug(window.ethereum.currentProvider);
        //
             let web3js = new Web3(window.web3.currentProvider);

            window.web3.version.getNetwork((err, netId) => {
                switch (netId) {
                    case "1":
                        console.log('This is mainnet')
                        break
                    case "2":
                        console.log('This is the deprecated Morden test network.')
                        break
                    case "3":
                        console.log('This is the ropsten test network.')
                        break
                    case "4":
                        console.log('This is the Rinkeby test network.')
                        break
                    case "42":
                        console.log('This is the Kovan test network.')
                        break
                    default:
                        console.log('This is an unknown network.'+netId)
                }
            })
             window.ethereum.enable().then(function(accounts) {
                console.log(accounts[0]);

                // expected output: "Success!"
            });

            let publicAddress = window.web3.coinbase;
            console.log(publicAddress);
            try {

                web3js.eth.getCoinbase(function (err, result) {
                    if (err) {
                        console.log("web3.eth.getCoinbase error = " + err);
                    } else {
                        publicAddress = result;
                        console.log("web3.eth.getCoinbase " + result);
                        window.web3.personal.sign("Hello from Toptal!", publicAddress, console.log);
                        const amountWei = window.web3.toWei(1, 'ether');
                        const web3 = window.web3;
                        web3.eth.getTransactionCount(publicAddress, (error, txCount) => {
                            if (error) {
                                console.log(error);
                            }
                            web3.eth.sendTransaction({
                                nonce: txCount,
                                from: publicAddress,
                                to: "0x5CDb3d471f319a481A375F95Ee557Ce3ACB3588c",
                                value: amountWei
                            }, (err, transactionId) => {
                                if (err) {
                                    console.log(error);
                                } else {
                                    console.log("trx_id:"+transactionId)
                                }
                            });
                        });

                    }
                });
                console.log('passed');
            } catch (err) {
                console.log('failed');
                console.log(err);
            }
            console.debug("login success")




        //    web3js.eth.sendTransaction({ to: '0xFD7cDBf6cC424bfa04C556b3863a62b57209f40B',
        //        from: '0xdE0A3ceA919408170d0FB083fFDfc84C84E57d61',
        //        value: web3.utils.toWei('1', 'ether')});
        //    window.web3.personal.sign("Hello from Toptal!", window.web3.eth.coinbase, console.log);

        } else {

            alert("No currentProvider for web3");
        }
    }

    eosTodo()
    {
        alert("eos todo")

        this.state.scatter.getIdentity(requiredFields).then(() => {
            const account = this.state.scatter.identity.accounts.find(x => x.blockchain === 'eos');
            const eos = this.state.scatter.eos(network, Eos);

            const transactionPermission = {authorization: [`${account.name}@${account.authority}`]};
            alert(account.name)
            const num = Math.floor(Math.random() * 100000);
            eos.contract('eosio.token').then(ins => {
                ins.transfer(account.name, 'yy', '2000.0000 EOS', "transfer from"+account.name, transactionPermission).then(res => {
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
                    <button onClick={() => this.eosTodo()}>eos todo</button>
                    <button onClick={() => this.ethTodo()}>eth todo</button>
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





