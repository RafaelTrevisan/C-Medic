import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Header, Left, Right, Container, Button, Body, Picker, Label } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5'

class EquipeScreen extends Component {
    //Drawer Navigation(Icones e Estilização)
    static navigationOptions = {
        drawerLockMode: "locked-closed", //->Impede de abrir o Drawer na lateral
        drawerIcon: ({ tintColor }) => (
            <Icon name="users" style={{ fontSize: 23, color: tintColor, width: 30 }} />

        )
    }

    render() {
        return (
            <Container >
                <Header androidStatusBarColor={'black'} style={{ backgroundColor: '#389B87' }}>
                    <Left>
                        <Button icontLeft transparent>
                            <Icon name="arrow-left" style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.goBack()} />
                        </Button>
                    </Left>
                    <Right></Right>
                </Header>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name="plus-circle" style={{ fontSize: 70, marginBottom: 30, color: '#389B80' }} />
                    <Text style={{ marginBottom: 40, fontSize: 20, width:"80%", textAlign:'center' }}>ADICIONE MÉDICOS, FARMÁCIAS, CUIDADORES E TREINADORES PARA CONTATA-LOS</Text>
                    <Button iconLeft style={styles.btnMedico} onPress={() => this.props.navigation.navigate('CarregarMedico')}>
                        <Icon name='user-md' style={styles.iconCustom} />
                        <Text style={{ fontSize: 20, right: 170 }}>Médico</Text>
                    </Button>

                    <Button iconLeft style={styles.btnFarmacia} onPress={() => this.props.navigation.navigate('CarregarFarmacia')}>
                        <Icon name='clinic-medical' style={styles.iconCustom} />
                        <Text style={{ fontSize: 20, right: 150 }}> Farmácia </Text>
                    </Button>

                    <Button iconLeft style={styles.btnCuidador} onPress={() => this.props.navigation.navigate('CarregarCuidador')}>
                        <Icon name='comment-medical' style={styles.iconCustom} />
                        <Text style={{ fontSize: 20, right: 155 }}>Cuidador</Text>
                    </Button>

                    <Button iconLeft style={styles.btnTrinador} onPress={() => this.props.navigation.navigate('CarregarTreinador')}>
                        <Icon name='user-circle' style={styles.iconCustom} />
                        <Text style={{ fontSize: 20, right: 155 }}>Treinador</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

//---------------------------------------Styles-------------------------------------------------//
const styles = StyleSheet.create({
    iconMenuCabecalho: {
        fontSize: 30,
        color: 'white'
    },
    btnMedico: {
        alignSelf: 'center',
        backgroundColor: 'white',
        height: 65,
        width: 300,
        //width:Dimensions.get('window').width,
        //height: Dimensions.get('window').height
        //https://github.com/marudy/react-native-responsive-screen
        borderRadius: 2,

    },
    btnFarmacia: {
        alignSelf: 'center',
        backgroundColor: 'white',
        height: 65,
        width: 300,
        borderRadius: 2,
        top: 2,

    },
    btnCuidador: {
        alignSelf: 'center',
        backgroundColor: 'white',
        height: 65,
        width: 300,
        borderRadius: 2,
        top: 4
    },
    btnTrinador: {
        alignSelf: 'center',
        backgroundColor: 'white',
        height: 65,
        width: 300,
        borderRadius: 2,
        top: 6,
    },
    iconCustom: {
        color: '#389B87',
        fontSize: 25,
        left: 15,
        width: 35
    }
})
export default EquipeScreen;