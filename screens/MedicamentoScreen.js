import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Header, Left, Right, Container, Button, Picker } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

class MedicamentoScreen extends Component {

    //Drawer Navigation(Icones e Estilização)
    static navigationOptions = {
        drawerLockMode: "locked-closed", //->Impede de abrir o Drawer na lateral
        drawerIcon: ({ tintColor }) => (
            <Icon name="pills" style={{ fontSize: 23, color: tintColor, width: 30 }} />
        )
    }

    state = { unidade: 'Pílula(s)' }

    //Evento do botão de adicionar Horario
    constructor() {
        super()
        this.state = {
            isVisible: false,
            //data: '',
            hora: '',
            unidade:''
        }
    }
    //Interagir
    handlePicker = (datetime) => {
        this.setState({
            isVisible: false,
            //('DD/MM/YY - HH:mm A')
            //data: moment(datetime).format('YYYYMMDD'),
            hora: moment(datetime).format('HHmm' + '00')
        })
        console.log(this.state.hora)
        console.log(datetime)
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
        //Ao renderizar irá pegar a unidade inicial, no caso Pilula(s)
        const unidade = this.state.unidade;
        var { data, hora } = this.state;

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
                        placeholder="Nome do Medicamento"
                        underlineColorAndroid="#389B87"
                    />
                    <Text style={styles.texto}>Unidade</Text>
                    <Picker style={styles.pickerStyle}
                        //Prop para selecionar o valor
                        selectedValue={this.state.unidade}
                        //Prop para Mudar de valores no Picker
                        //itemValue vai receber o value de cada picker e não o label
                        //itemIndex recebe o numero da posição de cada picker
                        onValueChange={(itemValue, itemIndex) =>
                            //setState serve para manipular a variavel state que foi criado no constructor
                            this.setState({ unidade: itemValue })}>
                        <Picker.Item label="Pílula(s)" value="pilula" />
                        <Picker.Item label="Ampola(s)" value="ampola" />
                        <Picker.Item label="Aplicações" value="aplicacao" />
                        <Picker.Item label="Cápsula(s)" value="capsula" />
                        <Picker.Item label="Gota(s)" value="gota" />
                        <Picker.Item label="Grama(s)" value="grama" />
                        <Picker.Item label="Inalações" value="inalacao" />
                        <Picker.Item label="Injeções" value="injecao" />
                        <Picker.Item label="Mililitro(s)" value="mililitro" />
                        <Picker.Item label="Peça(s)" value="peca" />
                        <Picker.Item label="Supositório" value="supositorio" />
                        <Picker.Item label="Unidad(es)" value="unidade" />
                    </Picker>
                    <TextInput
                        style={{ width: "95%", fontSize: 18, top: 15 }}
                        placeholder="Quantidade Para Ingerir"
                        underlineColorAndroid="#389B87"
                    />
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'red', fontSize: 20 }}>

                    </Text>
                    <Button icontLeft transparent style={styles.btnHorario} onPress={this.showPicker}>
                        <Icon name='stopwatch' style={{ color: '#389B87', fontSize: 23, right: 10 }} />
                        <Text style={{ color: 'black', fontSize: 17 }}>+ Adicionar Horário de Ingestão +</Text>
                    </Button>
                    <Text style={{ color: 'black', fontSize: 20, marginTop: 40 }}>
                        {hora}
                    </Text>
                    <DateTimePicker
                        isVisible={this.state.isVisible}
                        onConfirm={this.handlePicker}
                        onCancel={this.hidePicker}
                        mode={'time'}
                        is24Hour={true}
                        locale={'pt-br'}
                    />
                </View>
                <View>
                    <Button style={styles.btnSalvar}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Salvar Medicamento</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}
//************************************************************************************************* */
const styles = StyleSheet.create({
    iconMenuCabecalho: {
        fontSize: 23,
        color: 'white',
    },
    container: {
        width: "95%",
        fontSize: 18,
    },
    btnProximo: {
        width: "50%",
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: "#389B87"
    },
    btnHorario: {
        width: "95%",
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#C0C0C0',
        height: 60,
        top: 20
    },
    pickerStyle: {
        width: "95%",
        fontSize: 18,
        backgroundColor: '#C0C0C0',
        top: 10
    },
    texto: {
        alignSelf: 'center',
        width: "95%",
        top: 10
    },
    btnadicionar: {
        width: '50%',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
        marginTop: 40,
        backgroundColor: '#389B87'
    },
    btnSalvar: {
        width: '70%',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
        marginTop: 40,
        backgroundColor: '#389B87',
        marginTop: 400
    }
})

export default MedicamentoScreen;
/*
<Button style={styles.btnProximo}>
<Text style={{color:'white', fontSize:20}}>Próximo</Text>
</Button>*/