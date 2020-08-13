import React, { useState, useEffect }  from 'react';
import {View, Image, Text,TouchableOpacity} from 'react-native';
import { useNavigation} from '@react-navigation/native';
import styles from './styles';
import  { RectButton} from  'react-native-gesture-handler';

import landingImg  from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import api from '../../services/api';

function Landing() { 
const { navigate } = useNavigation();



const [ totalConnections, setTotalConnections] = useState(0);

useEffect(() => {
    api.get('connections').then(response =>{
        console.log(response);
        const { all } = response.data;
        setTotalConnections(all);
    })

}, []);

function HandleNavigateToGiveClassesPage(){
    navigate('GiveClasses');
}

function HandleNavigateToStudyPage(){
    navigate('Study');
}


    return (
        <View style={styles.container}> 
            <Image style={styles.banner} source={landingImg}/>
        
            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                 <Text style={styles.titleBold}>O que deseja fazer ?</Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton onPress={HandleNavigateToStudyPage} style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon}/>
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton onPress={HandleNavigateToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
                    <Image source={giveClassesIcon}/>
                    <Text style={styles.buttonText}>Dar Aula</Text>
                </RectButton>

            </View>
            <Text style={styles.totalConnections}> 
                Total de {totalConnections} conexões realizadas {' '}
                <Image source={heartIcon}/>
            </Text>
        </View>
       

    );
}

export default Landing;