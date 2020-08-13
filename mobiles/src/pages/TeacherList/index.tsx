import React, { useState, FormEvent, useEffect } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage';

import styles from './style';
import PageHeader from '../../componets/PageHeader';
import TeacherItem, { Teacher } from '../../componets/TeacherItem';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';


function TeacherList() {
    const [list, setList] = useState([]);
    const [favorite, setFavorite] = useState<number[]>([]);
    const [isFilter, setIsFilter] = useState(false);
    const [subject, setSubject] = useState('')
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [])
      )
      
    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response =>{
            if(response){
                const favoritesTeacher = JSON.parse(response);
                const favoritesTeacherId = favoritesTeacher.map((teacher: Teacher) =>{
                    return teacher.id;
                })
                setFavorite(favoritesTeacherId);
            }
        });
    }
     
    function handleFiltersVisible() {
        setIsFilter(!isFilter)
    }

    async function seachTeachers() {
        loadFavorites();
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });
        
        setIsFilter(false);
        setList(response.data);
    }

    return (
        <View style={styles.container} >
            <PageHeader title="Proffys disponíveis"
                HeaderRight={
                    (<BorderlessButton onPress={handleFiltersVisible}>
                        <Feather name="filter" size={20} color="#fff" />
                    </BorderlessButton>)
                }>
                {isFilter && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matérias</Text>
                        <TextInput style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#c1bcc"
                        />
                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput style={styles.input}
                                    value={week_day}
                                    onChangeText={text => setWeek_day(text)}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bcc"
                                />

                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Qual o horário?"
                                    placeholderTextColor="#c1bcc"
                                />

                            </View>
                        </View>

                        <RectButton onPress={seachTeachers} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>

                    </View>
                )}

            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={
                    {
                        paddingBottom: 16,
                        paddingHorizontal: 16
                    }
                }
            >

                {list.map( (teacher: Teacher)=>{
                    return (
                    <TeacherItem key={teacher.id} 
                    teacher={teacher} 
                    favorited={favorite.includes(teacher.id)}
                    />);
                })}
                
            </ScrollView>

        </View>
    );

}

export default TeacherList;