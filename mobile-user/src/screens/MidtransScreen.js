import React from 'react';
import { WebView } from 'react-native-webview';

const MidtransScreen = ({route,navigation}) => {
    const uri = route.params.URI
    
    return <WebView 
            source={{ uri: uri }} 
            style={{ flex: 1 }} 
            onNavigationStateChange={(navState) => {
            if(navState.loading && navState.canGoBack){
                navigation.navigate('SuccessScreen')
            }
            }}/>;
};

export default MidtransScreen;  
