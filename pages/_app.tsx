import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Provider} from "react-redux";
import {store} from "../store/store";
import {Layout} from "antd";
import 'antd/dist/antd.css'
import HeaderComponent from "../components/Header/Header";
import SideBar from "../components/SideBar/SideBar";
import {Flex} from "../utils/utils";
import React from "react";
const {Content}=Layout
function MyApp({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <Layout>
      <HeaderComponent/>
      <div className={"container"}>
        <Flex justifyContent={"space-between"}>
          <Content><Component {...pageProps} /></Content>
          <SideBar/>
        </Flex>
      </div>

    </Layout>

  </Provider>

}

export default MyApp
