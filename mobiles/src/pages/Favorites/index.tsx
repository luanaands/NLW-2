import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../componets/PageHeader';
import TeacherItem, { Teacher } from '../../componets/TeacherItem';

import styles from './style';



function Favorites() {
    const [favorite, setFavorite] = useState([]);

  
    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritesTeacher = JSON.parse(response);
                setFavorite(favoritesTeacher);
            }
        });
    }

    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [])
      )

    return (
        <View style={styles.container} >
            <PageHeader title="Meus Proffys favoritos" />

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={
                    {
                        paddingBottom: 16,
                        paddingHorizontal: 16
                    }
                }
            >

                {favorite.map((teacher: Teacher) => {
                    return (
                        <TeacherItem key={teacher.id}
                            teacher={teacher}
                            favorited={true}
                        />);
                })}

            </ScrollView>
        </View>
    );
}

export default Favorites;