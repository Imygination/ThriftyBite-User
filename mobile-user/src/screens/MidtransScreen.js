import React from 'react';
import { WebView } from 'react-native-webview';

const MidtransScreen = ({route}) => {
    const uri = route.params.URI
    console.log(uri)
    return <WebView source={{ uri: uri }} style={{ flex: 1 }} />;
};

export default MidtransScreen;
