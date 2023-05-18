import React from 'react'
import { View, Text, TextInput, ScrollView } from 'react-native';
import { HeaderComponent } from '../../../../components/header/header-component';
import { styles } from '../../tabs.style';
import { RequestCard } from '../../../../components/request-card/request-card';
import { V2requests } from '../../../../utils/database/app';
import { auth } from '../../../../utils/services/firebase';
import MainApp from '../../../../components/test';
export default function UserRequests() {
    const user = auth.currentUser
    return (
        <View style={{ backgroundColor: 'white', minHeight: '100%' }}>
            <Provider store={store}><MainApp /></Provider>
            <HeaderComponent title="Your Requests" />
            <ScrollView style={{ marginBottom: 75 }}>
                <TextInput style={styles.search} placeholder='Search Request' />
                <RequestCard config={V2requests.filter((res) => res.authorEmail === `${user.email}`)} />
            </ScrollView>

        </View>
    )
}
