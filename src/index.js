import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Web3 from "web3";
import Axios from "axios"
import UUTokenAbi from './UUToken_abi';

let abiStr = "[{\"constant\":true,\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_spender\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"name\":\"success\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"status\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_from\",\"type\":\"address\"},{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"name\":\"success\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"name\":\"\",\"type\":\"uint8\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"controller1\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"balance\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"name\":\"success\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"controller2\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"},{\"name\":\"_spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"name\":\"remaining\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"_from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"_to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"_owner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"_spender\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"constant\":false,\"inputs\":[],\"name\":\"turnon\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"turnoff\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]";
let abiJson = JSON.parse(abiStr)
let abiArray = abiJson;


let abiStrUUToken = "[{\"constant\":true,\"inputs\":[{\"name\":\"_interfaceID\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"name\":\"_name\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"getApproved\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_approved\",\"type\":\"address\"},{\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_from\",\"type\":\"address\"},{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_from\",\"type\":\"address\"},{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"ownerOf\",\"outputs\":[{\"name\":\"_owner\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"name\":\"_symbol\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_operator\",\"type\":\"address\"},{\"name\":\"_approved\",\"type\":\"bool\"}],\"name\":\"setApprovalForAll\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_from\",\"type\":\"address\"},{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_tokenId\",\"type\":\"uint256\"},{\"name\":\"_data\",\"type\":\"bytes\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"tokenURI\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"},{\"name\":\"_operator\",\"type\":\"address\"}],\"name\":\"isApprovedForAll\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"name\":\"_name\",\"type\":\"string\"},{\"name\":\"_symbol\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"_from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"_to\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"_owner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"_approved\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"_owner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"_operator\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"_approved\",\"type\":\"bool\"}],\"name\":\"ApprovalForAll\",\"type\":\"event\"},{\"constant\":false,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"},{\"name\":\"_id\",\"type\":\"uint256\"}],\"name\":\"mint\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"},{\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"burn\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n"
let abiJsonUUToken = JSON.parse(abiStrUUToken)
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
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    async ethTodo(to, amount) {
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
            const currentGasPrices = await GetCurrentGasPrices();
            try {

                web3js.eth.getCoinbase(function (err, result) {
                    if (err) {
                        console.log("web3.eth.getCoinbase error = " + err);
                    } else {
                        publicAddress = result;
                        console.log("web3.eth.getCoinbase " + result);
                        window.web3.personal.sign("Hello from Toptal!", publicAddress, console.log);
                        const amountWei = window.web3.toWei(amount, 'ether');
                        const web3 = window.web3;
                        web3.eth.getTransactionCount(publicAddress, (error, txCount) => {
                            if (error) {
                                console.log(error);
                            }
                            web3.eth.sendTransaction({
                                nonce: txCount,
                                gasPrice: currentGasPrices.high,
                                from: publicAddress,
                                to: to,
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

            let fromAddress = "0xfd7cdbf6cc424bfa04c556b3863a62b57209f40b";
            let toAddress = "0x212781FF156e7e24A4b7aDCc965b5aDe781Dea67";
            let web3 = window.web3;
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
            let tokenAmount = web3js.utils.toWei(amount.toString(), 'ether');



            const currentGasPrices = await GetCurrentGasPrices();
            let nonce = web3js.eth.getTransactionCount(fromAddress);
// Will call estimate the gas a method execution will take when executed in the EVM without.


            const nonceHex = web3js.utils.toHex(nonce)
            let chainIdHex= web3js.utils.toHex(50)
            // let transaction = {
            //     "value": '0x0', // Only tokens
            //     "data": contract.methods.transfer(toAddress, tokenAmount).encodeABI(),
            //     "from": fromAddress,
            //     "to": contractAddress,
            //     "nonce": nonceHex,
            //     //"gas": web3.utils.toHex(estimateGas),
            //     "gasLimit": '0x30D40',
            //     // "gasLimit": web3.utils.toHex(estimateGas),
            //     "gasPrice": web3js.utils.toHex(Math.trunc(currentGasPrices.medium * 1e9)),
            //     "chainId": chainIdHex
            // };
            web3js.eth.getCoinbase(function (err, result) {
                if (err) {
                    console.log("web3.eth.getCoinbase error = " + err);
                } else {
                    let publicAddress = result;
                    console.log("web3.eth.getCoinbase " + result);
                    contract.methods.transfer(toAddress, tokenAmount).send({from:publicAddress, gas: 300000}, function (error, result) {
                        if (error != null) {
                            console.log(error)
                        }
                        else {
                            console.log(result)
                        }
                    });


                }
            });
        }
    }


    async mintTodo()
    {
        if (typeof window.ethereum !== 'undefined') {
            let web3 = window.web3;
            let web3js = new Web3(window.web3.currentProvider);
            let contractAddress = "0x8b907e3163924aa887066215d8d065695f028f89";
            let fromAddress = "0x8c4fFCc692AF5d1000277e676819b405A0Fa8478";
            let toAddress = "0x212781FF156e7e24A4b7aDCc965b5aDe781Dea67";
            let contract = new web3js.eth.Contract(abiJsonUUToken, contractAddress, {
                from: fromAddress
            });

            const currentGasPrices = await GetCurrentGasPrices();
            let nonce = web3js.eth.getTransactionCount(fromAddress);
// Will call estimate the gas a method execution will take when executed in the EVM without.


            const nonceHex = web3js.utils.toHex(nonce)
            let chainIdHex= web3js.utils.toHex(50)
            let token_id = 0x5678;
            let transaction = {
                "value": '0x0', // Only tokens
                "data": contract.methods.mint(toAddress, token_id).encodeABI(),
                "from": fromAddress,
                "to": contractAddress,
                "nonce": nonceHex,
                //"gas": web3.utils.toHex(estimateGas),
                "gasLimit": '0x30D40',
                // "gasLimit": web3.utils.toHex(estimateGas),
                "gasPrice": web3js.utils.toHex(Math.trunc(currentGasPrices.medium * 1e9)),
                "chainId": chainIdHex
            };
            web3js.eth.getAccounts(function (err, result) {
                if (err) {
                    console.log("web3.eth.getCoinbase error = " + err);
                } else {
                    let publicAddress = result[3];
                    console.log("web3.eth.getCoinbase " + result);
                    contract.methods.mint(toAddress, token_id).send({from:publicAddress, gas: 300000}, function (error, result) {
                        if (error != null) {
                            console.log(error)
                        }
                        else {
                            console.log(result)
                        }
                    });


                }
            });
        }
    }

    render() {
        return (
            <div>
                Hello {this.props.name}
                bye {this.props.bye}
                <div>
                    {/*<button onClick={() => this.eosTodo()}>eos todo</button>*/}
                    <button onClick={() => this.ethTodo(this.state.to, this.state.amount)}>eth todo</button>
                    <p>to: <input type="text" onChange={e => {
                        this.setState({
                            to: e.target.value
                        })
                    }}/></p>

                    <p>amount: <input type="text" onChange={e => {
                        this.setState({
                            amount: Number.parseInt(e.target.value)
                        })
                    }}/></p>




                    <button onClick={() => this.transferTodo()}>eth token transfer todo</button>
                    <input type="text" onChange={e => {
                        this.setState({
                            competedId: Number.parseInt(e.target.value)
                        })
                    }}/>
                    <button onClick={() => this.mintTodo()}>show todo</button>
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





