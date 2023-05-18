import React from 'react'
import { View, Text, TextInput, ScrollView } from 'react-native';
import { HeaderComponent } from '../../../../components/header/header-component';
import { styles } from '../../tabs.style';
import { RequestTabCommunial } from '../../../../components/request-tabs/request-tabs';
import { communial, requests } from '../../../../utils/database/requests';
import { RequestCard } from '../../../../components/request-card/request-card';
import { V2requests } from '../../../../utils/database/app';
import { auth } from '../../../../utils/services/firebase';


export default function CommunalRequest() {
    return (
        <View style={{ backgroundColor: 'white', minHeight: '100%' }}>
            <HeaderComponent title="Communal Request" />
            <ScrollView style={{ marginBottom: 75 }}>
                <TextInput style={styles.search} placeholder='Search Request' />
                <RequestCard config={V2requests.filter((res) => res.authorEmail !== `${auth.currentUser.email}`)} />
            </ScrollView>
        </View>
    )
}