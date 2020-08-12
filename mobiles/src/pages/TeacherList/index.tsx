import React from 'react';
import { View } from 'react-native';

import styles from './style';
import PageHeader from '../../componets/PageHeader';
import TeacherItem from '../../componets/TeacherItem';
import { ScrollView } from 'react-native-gesture-handler';


function TeacherList() {
    return (
        <View style={styles.container} >
            <PageHeader title="Proffys disponíveis" />
            <ScrollView>
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
            </ScrollView>

        </View>
    );

}

export default TeacherList;