import React, { ReactNode } from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';

import backIcons from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

import styles from './style';

interface PageHeaderProps {
    title: string;
    HeaderRight?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({title, HeaderRight,children}) => {
    const { navigate } = useNavigation();

    function handlerGoBack() {
        navigate('Landing');
    }
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton onPress={handlerGoBack}>
                    <Image source={backIcons}  resizeMode='contain'/>
                </BorderlessButton>
                <Image source={logoImg}  resizeMode='contain'/>
           
            </View>
            <View style={styles.header}>
               <Text style={styles.title}>{title}</Text>
               {HeaderRight}
            </View>
           

            {children}
        </View>
    );
}

export default PageHeader;