import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

export const PendingBadge = () => {
    return (
        <View style={[styles.badge, styles.pending]}>
            <Text style={styles.text}>
            Status : Pending
            </Text>
        </View>
    );
}

export const ApprovedBadge = () => {
    return (
        <View style={[styles.badge, styles.approved]}>
            <Text style={styles.text}>
            Status : Approved
            </Text>
        </View>
    );
}

export const TerminatedBadge = () => {
    return (
        <View style={[styles.badge, styles.disapproved]}>
            <Text style={styles.text}>
                Status : Disapproved
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        padding: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 5
    },
    text: {
        color: 'white',
        fontWeight: 'bold',

    },
    pending: {
        backgroundColor: 'orange',
        alignItems: 'center'
    },
    approved: {
        backgroundColor: 'green',
        alignItems: 'center'
    },
    disapproved: {
        backgroundColor: 'red',
        alignItems: 'center'
    }
});