import React from 'react';
import { View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';

import styles from './styles';


function TeacherItem(){
    return(

            <View style={styles.container}>
                <View style={styles.profile}>
                    <Image style={styles.avatar}
                     source={{uri: 'https://pbs.twimg.com/profile_images/1285366701572448257/hIZIO_UB_200x200.jpg'}}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>Luana Santana</Text>
                        <Text style={styles.subject}>Programadora</Text>
                       
                    </View>

                    
                </View>
                <Text style={styles.bio}>Uma pessoa apaixonada por coisas novas,
                adora comer, cozinhar, e a companhia de bons amigos</Text>

                <View style={styles.footer}>
                    <Text style={styles.price}>
                        Preço {'   '}
                        <Text style={styles.priceValue}>R$ 20,00</Text>
                    </Text>
                    <View style={styles.buttonsContainer}>
                        <RectButton style={styles.favoriteButton}>
                            <Image source={heartOutlineIcon}/>
                        </RectButton>
                        <RectButton style={styles.contactButton}>
                            <Image source={whatsappIcon}/>
                            <Text style={styles.contactButtonText}>Entrar em contato</Text>
                        </RectButton>
                    </View>
                </View>
            </View>
    );
}


export default TeacherItem;