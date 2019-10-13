import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Header, Left, Right, Container, Button, Body, Picker, Label } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';

class AtividadeScreen extends Component {

    //Drawer Navigation(Icones e Estilização)
    static navigationOptions = {
        drawerLockMode: "locked-closed", //->Impede de abrir o Drawer na lateral
        drawerIcon: ({ tintColor }) => (
            <Icon name="running" style={{ fontSize: 23, color: tintColor, width: 30 }} />
            
        )
    }

    //Evento do botão de adicionar Horario
    constructor() {
        super()
        this.state = {
            isVisible: false,
            chosenTime: ''
        }
    }
    //Interagir
    handlePicker = () => {
        this.setState({
            isVisible: false,
        })
    }
    //Mostrar picker
    showPicker = () => {
        this.setState({
            isVisible: true
        })
    }
    //Esconder Picker
    hidePicker = () => {
        this.setState({
            isVisible: false
        })
    }
    //************************************************************************************************** */   
    render() {
        return (
            <Container>
                <Header androidStatusBarColor={'black'} style={{ backgroundColor: '#389B87' }}>
                    <Left>
                        <Button icontLeft transparent>
                            <Icon name="arrow-left" style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.goBack()} />
                        </Button>
                    </Left>
                    <Right></Right>
                </Header>
                <View style={{ alignItems: 'center' }}>
                    <TextInput
                        style={styles.container}
                        placeholder="Nome da Atividade"
                        underlineColorAndroid="#389B87"
                    />
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'red', fontSize: 20 }}>

                    </Text>
                    <Button icontLeft transparent style={styles.btnHorario} onPress={this.showPicker}>
                        <Icon name='stopwatch' style={{ color: '#389B87', fontSize: 23, right: 10 }} />
                        <Text style={{ color: 'black', fontSize: 17 }}>+ Adicionar Horário da Atividade +</Text>
                    </Button>
                    <DateTimePicker
                        isVisible={this.state.isVisible}
                        onConfirm={this.handlePicker}
                        onCancel={this.hidePicker}
                        mode={'time'}
                        is24Hour={false}
                    />
                </View>
            </Container>
        )
    }
}
//*************************************************************************************************
const styles = StyleSheet.create({
    iconMenuCabecalho: {
        fontSize: 23,
        color: 'white',
    },
    container: {
        width: "95%",
        fontSize: 18,
    },
    btnHorario: {
        width: "95%",
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
        height: 60,
        top: 20
    }
})

export default AtividadeScreen;