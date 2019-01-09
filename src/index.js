import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';
import Web3 from "web3";
import Axios from "axios"
import fileUtil from 'fs';

ScatterJS.plugins(new ScatterEOS());

const requiredFields = {
    accounts: [
        {
            blockchain: 'eos',
            host: '127.0.0.1',
            port: 7777,
            chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
        },
    ]
};


const network = {
    blockchain: 'eos',
    protocol: 'http',
    host: '127.0.0.1',
    port: 7777,
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
}

async function GetCurrentGasPrices() {
    let response = await Axios.get('https://ethgasstation.info/json/ethgasAPI.json');
    let prices = {
        low: response.data.safeLow / 10,
        medium: response.data.average / 10,
        high: response.data.fast / 10
    };

    console.log("\r\n");
    console.log("Current ETH Gas Prices (in GWEI):");
    console.log("\r\n");
    console.log(`Low: ${prices.low} (transaction completes in < 30 minutes)`);
    console.log(`Standard: ${prices.medium} (transaction completes in < 5 minutes)`);
    console.log(`Fast: ${prices.high} (transaction completes in < 2 minutes)`);
    console.log("\r\n");

    return prices
}


//ReactDOM.render(<App />, document.getElementById('root'));
class HelloMessage extends React.Component {


    componentDidMount() {
        ScatterJS.scatter.connect('eos').then(connected => {
            if (!connected) return false;
            const scatter = ScatterJS.scatter;

            this.setState({
                scatter
            });
            alert("scatter load success")
        });
    }

    ethTodo() {
        console.debug("eth todo");
        if (typeof window.ethereum !== 'undefined') {
            console.debug(window.ethereum.currentProvider);
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
                        console.log('This is an unknown network.' + netId)
                }
            })
            window.ethereum.enable().then(function (accounts) {
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
                                    console.log("trx_id:" + transactionId)
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

        } else {

            alert("No currentProvider for web3");
        }
    }



    async transferTodo() {
        if (typeof window.ethereum !== 'undefined') {
            let abiStr = "[{\"constant\":true,\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_spender\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"name\":\"success\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"status\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_from\",\"type\":\"address\"},{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"name\":\"success\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"name\":\"\",\"type\":\"uint8\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"controller1\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"balance\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"name\":\"success\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"controller2\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"},{\"name\":\"_spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"name\":\"remaining\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"_from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"_to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"_owner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"_spender\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"constant\":false,\"inputs\":[],\"name\":\"turnon\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"turnoff\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]";
            let abiJson = JSON.parse(abiStr)
            let abiArray = abiJson;
            let fromAddress = "0xfd7cdbf6cc424bfa04c556b3863a62b57209f40b";
            let toAddress = "0x5cdb3d471f319a481a375f95ee557ce3acb3588c";
            let web3js = new Web3(window.web3.currentProvider);
            let contractAddress = "0x7bf09685b164d2491c4839ece2cb102a1d6a7a65";
            let contract = new web3js.eth.Contract(abiArray, contractAddress, {
                from: fromAddress
            });
            contract.methods.balanceOf(fromAddress).call({from: fromAddress}, function (error, result) {
                    if (error != null) {
                        console.log(error)
                    }
                    else {
                        console.log(result)
                    }
                }
            );
            let amount = 1;
            let tokenAmount = web3js.utils.toWei(amount.toString(), 'ether')



            const currentGasPrices = await GetCurrentGasPrices();
            let nonce = web3js.eth.getTransactionCount(fromAddress);
// Will call estimate the gas a method execution will take when executed in the EVM without.


            const nonceHex = web3js.utils.toHex(nonce)
            let chainIdHex= web3js.utils.toHex(50)
            let transaction = {
                "value": '0x0', // Only tokens
                "data": contract.methods.transfer(toAddress, tokenAmount).encodeABI(),
                "from": fromAddress,
                "to": contractAddress,
                "nonce": nonceHex,
                //"gas": web3.utils.toHex(estimateGas),
                "gasLimit": '0x30D40',
                // "gasLimit": web3.utils.toHex(estimateGas),
                "gasPrice": web3js.utils.toHex(Math.trunc(currentGasPrices.medium * 1e9)),
                "chainId": chainIdHex
            };
        }
    }

    eosTodo() {
        alert("eos todo")

        this.state.scatter.getIdentity(requiredFields).then(() => {
            const account = this.state.scatter.identity.accounts.find(x => x.blockchain === 'eos');
            const eos = this.state.scatter.eos(network, Eos);

            const transactionPermission = {authorization: [`${account.name}@${account.authority}`]};
            alert(account.name)
            const num = Math.floor(Math.random() * 100000);
            eos.contract('eosio.token').then(ins => {
                ins.transfer(account.name, 'yy', '2000.0000 EOS', "transfer from" + account.name, transactionPermission).then(res => {
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

                    <button onClick={() => this.transferTodo()}>complete todo</button>
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

ReactDOM
    .render(
        <HelloMessage name="Taylor" bye={"Chuan"}/>,
        document
            .getElementById(
                "head"
            )
    )
;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();





