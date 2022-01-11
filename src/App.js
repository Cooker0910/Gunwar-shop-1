import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import 'react-responsive-modal/styles.css';

import React, { useEffect, useState, useCallback, useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import Web3Modal from "web3modal";
// import Portis from "@portis/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
// import WalletLink from 'walletlink'
import { providers, ethers } from 'ethers'

import AppLayout from './layouts/AppLayout';
import routes from './routes/route';
import ContactUs from './components/ContactUs';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
// import modelPath from '../assets/scene.glb';
import check from './assets/check.png';

const supportedChains = [
  {
    name: 'Ethereum Mainnet',
    short_name: 'eth',
    chain: 'ETH',
    network: 'mainnet',
    chain_id: 1,
    network_id: 1,
    rpc_url: 'https://mainnet.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Ropsten',
    short_name: 'rop',
    chain: 'ETH',
    network: 'ropsten',
    chain_id: 3,
    network_id: 3,
    rpc_url: 'https://ropsten.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Rinkeby',
    short_name: 'rin',
    chain: 'ETH',
    network: 'rinkeby',
    chain_id: 4,
    network_id: 4,
    rpc_url: 'https://rinkeby.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Görli',
    short_name: 'gor',
    chain: 'ETH',
    network: 'goerli',
    chain_id: 5,
    network_id: 5,
    rpc_url: 'https://goerli.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'RSK Mainnet',
    short_name: 'rsk',
    chain: 'RSK',
    network: 'mainnet',
    chain_id: 30,
    network_id: 30,
    rpc_url: 'https://public-node.rsk.co',
    native_currency: {
      symbol: 'RSK',
      name: 'RSK',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Kovan',
    short_name: 'kov',
    chain: 'ETH',
    network: 'kovan',
    chain_id: 42,
    network_id: 42,
    rpc_url: 'https://kovan.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Classic Mainnet',
    short_name: 'etc',
    chain: 'ETC',
    network: 'mainnet',
    chain_id: 61,
    network_id: 1,
    rpc_url: 'https://ethereumclassic.network',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'POA Network Sokol',
    short_name: 'poa',
    chain: 'POA',
    network: 'sokol',
    chain_id: 77,
    network_id: 77,
    rpc_url: 'https://sokol.poa.network',
    native_currency: {
      symbol: 'POA',
      name: 'POA',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'POA Network Core',
    short_name: 'skl',
    chain: 'POA',
    network: 'core',
    chain_id: 99,
    network_id: 99,
    rpc_url: 'https://core.poa.network',
    native_currency: {
      symbol: 'POA',
      name: 'POA',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'xDAI Chain',
    short_name: 'xdai',
    chain: 'POA',
    network: 'dai',
    chain_id: 100,
    network_id: 100,
    rpc_url: 'https://dai.poa.network',
    native_currency: {
      symbol: 'xDAI',
      name: 'xDAI',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Callisto Mainnet',
    short_name: 'clo',
    chain: 'callisto',
    network: 'mainnet',
    chain_id: 820,
    network_id: 1,
    rpc_url: 'https://clo-geth.0xinfra.com/',
    native_currency: {
      symbol: 'CLO',
      name: 'CLO',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Binance Smart Chain',
    short_name: 'bsc',
    chain: 'smartchain',
    network: 'mainnet',
    chain_id: 56,
    network_id: 56,
    rpc_url: 'https://bsc-dataseed1.defibit.io/',
    native_currency: {
      symbol: 'BNB',
      name: 'BNB',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
]


function getChainData(chainId) {
  if (!chainId) {
    return null
  }
  const chainData = supportedChains.filter(
    (chain) => chain.chain_id === chainId
  )[0]

  if (!chainData) {
    throw new Error('ChainId missing or not supported')
  }

  const API_KEY = '88b3ca144c6648df843909df0371ee08'

  if (
    chainData.rpc_url.includes('infura.io') &&
    chainData.rpc_url.includes('%API_KEY%') &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY)

    return {
      ...chainData,
      rpc_url: rpcUrl,
    }
  }

  return chainData
}

const INFURA_ID = '88b3ca144c6648df843909df0371ee08'

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  }
}

let web3Modal
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    //network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
    // theme: "dark",
  })
}

const initialState = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_WEB3_PROVIDER':
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      }
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.address,
      }
    case 'SET_CHAIN_ID':
      return {
        ...state,
        chainId: action.chainId,
      }
    case 'RESET_WEB3_PROVIDER':
      return initialState
    default:
      throw new Error()
  }
}

var adminWallet = '0x52aC1AD50ECf7726CB666A8bb3B3b443a6824d7e'
const App = () => {
  const [account, setAccount] = useState('');
  const [signer_1, setSigner] = useState();

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const purchase = async(amount) => {
    const amountBNB = new ethers.utils.parseEther(amount);
    const transaction = {
      'to': adminWallet, // faucet address to return eth
      'value': amountBNB
    };

    const signedTx = await signer_1.sendTransaction(transaction)
    .then( async(result) => {
      const txResult = await result.wait();
      if(txResult.status === 1 && txResult.to === adminWallet) {
        onOpenModal();
        console.log("success");
      } else {
        console.log("error");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  const changeNetwork = () => {
    NotificationManager.warning("Please Change Network to Binance Smart Chain", '', 3000);
  }

  useEffect(() => {
    setAccount(account);
    setSigner(signer_1);
  }, [account, signer_1]);


  const [state, dispatch] = useReducer(reducer, initialState)
  const { provider, web3Provider, address, chainId } = state

  const connect = useCallback(async function () {
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    const provider = await web3Modal.connect()

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    setSigner(web3Provider.getSigner());
    const address = await signer.getAddress();
    const network = await web3Provider.getNetwork();

    if (network.chainId != 56) {
      console.log('asdf');
      changeNetwork();
      return;
    }

    dispatch({
      type: 'SET_WEB3_PROVIDER',
      provider,
      web3Provider,
      address,
      chainId: network.chainId,
    })
  }, [])

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider()
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }

      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      })
    },
    [provider]
  )

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect()
    }
  }, [connect])

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        // eslint-disable-next-line no-console
        console.log('accountsChanged', accounts)
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        })
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId) => {
        window.location.reload()
      }

      const handleDisconnect = (error) => {
        // eslint-disable-next-line no-console
        console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])

  const chainData = getChainData(chainId)

  

  return (
    <BrowserRouter>
      <ContactUs />
      <Header 
        account={setAccount}
        signer={setSigner}
        connect={connect}
        disconnect={disconnect}
        web3Provider={web3Provider}
      />
      <AppLayout>
        <Routes>
          {routes.map((route, idx) => (
            route.component && (
              <Route
                key={idx}
                path={route.path}
                name={route.name}
                element={<route.component 
                  onClick={purchase}
                />}
              />
            )
          ))}
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </AppLayout>
      <Footer />
      <Modal 
        open={open} 
        onClose={onCloseModal} 
        center 
        showCloseIcon={false}
        classNames={{
          modal: 'customModal'
        }}
      >
        <img src={check} className='modal-img' />
        <p>You have purchased successfully.</p>
        <button className='modal-button' onClick={onCloseModal}>OK</button>
      </Modal>
      <NotificationContainer />
    </BrowserRouter>
  );
}


export default App;
