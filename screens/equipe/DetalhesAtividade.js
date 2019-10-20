import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header, Left, Right, Container, Button, CheckBox, ListItem, Body } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';

import moment from 'moment';
import { db } from "../../assets/Constante";

class DetalhesAtividade extends Component {

    //Drawer Navigation(Icones e Estilização)
    static navigationOptions = {
        drawerLabel: () => null,
        drawerLockMode: "locked-closed", //->Impede de abrir o Drawer na lateral
        header: null
    }

    //Evento do botão de adicionar Horario
    constructor() {
        super()
        this.state = {
            isVisible: false,
            Nome: '',
            hora: '000000',
            checkedDom: false,
            checkedSeg: false,
            checkedTer: false,
            checkedQua: false,
            checkedQui: false,
            checkedSex: false,
            checkedSab: false
        }
    }
/*
    componentDidMount() {
        const { navigation } = this.props;
        const data = navigation.getParam('data');
        this.setState({ Nome: data.Nome })
        this.setState({hora: data.hora})
    }
    */
    //Função Para salvar
    salvar = (nav) => {
        var { Nome, hora, checkedDom, checkedSeg, checkedTer, checkedQua, checkedQui, checkedSex, checkedSab } = this.state
        var DiasSemana = '123'
        if (Nome == '' || hora == '000000') {
            Alert.alert(
                'Atenção',
                'Preencha todos os campos antes de salvar!')
            return
        }
        if (checkedDom === false
            && checkedSeg === false
            && checkedTer === false
            && checkedQua === false
            && checkedQui === false
            && checkedSex === false
            && checkedSab === false) {
            Alert.alert(
                'Atenção',
                'Preencha ao menos um dia semana para salvar')
            return
        }
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO Atividade (Nome) VALUES (?)',
                [Nome],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        var atividadeId = results.insertId.toString();
                        db.transaction((tx) => {
                            tx.executeSql(
                                'INSERT INTO AtividadeHorario (DiaSemana, CodigoAtividade, Hora) VALUES (?,?,?)',
                                [DiasSemana, atividadeId, hora],
                                (tx, results) => {
                                    Alert.alert(
                                        'Informação',
                                        'Registro salvo com sucesso.',
                                        [
                                            {
                                                text: 'Ok',
                                                onPress: () =>
                                                    nav.navigate('CarregarAtividade'),
                                            },
                                        ],
                                        { cancelable: false }
                                    );
                                })
                        })
                    } else {
                        alert('Erro ao salvar dados.');
                    }
                }
            );
        });
    }
    //--------------------------------------------------------------------------//
    excluir = (nav, Codigo) => {
        console.log(Codigo)
        Alert.alert(
            'Atenção',
            'Deseja Realmente Excluir o Registro?',
            [
                {
                    text: 'Sim', onPress: () => {
                        console.log('Sim Pressed')
                        db.transaction(function (tx) {
                            tx.executeSql(
                                'DELETE FROM ATIVIDADE WHERE CODIGO = ?',
                                [Codigo],
                                (tx, results) => {
                                    console.log('Results', results.rowsAffected);
                                    if (results.rowsAffected > 0) {
                                        Alert.alert(
                                            'Informação',
                                            'Registro Excluido com sucesso.',
                                            [
                                                {
                                                    text: 'Ok',
                                                    onPress: () =>
                                                        nav.navigate('CarregarAtividade'),
                                                },
                                            ],
                                            { cancelable: false }
                                        );
                                    } else {
                                        alert('Erro ao salvar dados.');
                                    }
                                }
                            );
                        })
                    }
                },
                {
                    text: 'Não', onPress: () => console.log('Cancel Pressed')
                }
            ]
        )
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
        var { checkedDom, checkedSeg, checkedTer, checkedQua, checkedQui, checkedSex, checkedSab, hora } = this.state;

        return (
            <Container>
                <Header androidStatusBarColor={'black'} style={{ backgroundColor: '#389B87' }}>
                    <Left>
                        <Button icontLeft transparent>
                            <Icon name="arrow-left" style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.goBack()} />
                            <Text style={styles.textHeader}>  Alterar Atividade</Text>
                        </Button>
                    </Left>
                    <Right></Right>
                </Header>
                <ScrollView>
                    <View style={{ alignItems: 'center' }}>
                        <TextInput
                            style={styles.container}
                            placeholder="Nome da Atividade"
                            underlineColorAndroid="#389B87"
                            onChangeText={(Nome) => this.setState({ Nome })}
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Button icontLeft transparent style={styles.btnHorario} onPress={this.showPicker}>
                            <Icon name='stopwatch' style={{ color: '#389B87', fontSize: 23, right: 10 }} />
                            <Text style={{ color: 'black', fontSize: 17 }}>+ Adicionar Horário de Ingestão +</Text>
                        </Button>
                        <Text style={{ color: 'black', fontSize: 20, marginTop: 40 }}>
                            {hora.slice(0, 2)}:{hora.slice(2, 4)}
                        </Text>
                        <DateTimePicker
                            isVisible={this.state.isVisible}
                            onConfirm={this.handlePicker}
                            onCancel={this.hidePicker}
                            mode={'time'}
                            is24Hour={false}
                        />
                    </View>
                    <View containerStyle={styles.checkBoxContainer}>
                        <ListItem>
                            <CheckBox checked={checkedDom} color="green" onPress={() => this.setState({ checkedDom: !checkedDom })} />
                            <Body style={styles.checkBoxItem}>
                                <Text>Domingo</Text>
                            </Body>
                            <CheckBox checked={checkedSeg} color="green" onPress={() => this.setState({ checkedSeg: !checkedSeg })} />
                            <Body style={styles.checkBoxItem}>
                                <Text>Segunda-Feira</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <CheckBox checked={checkedTer} color="green" onPress={() => this.setState({ checkedTer: !checkedTer })} />
                            <Body style={styles.checkBoxItem}>
                                <Text>Terça-Feira</Text>
                            </Body>
                            <CheckBox checked={checkedQua} color="green" onPress={() => this.setState({ checkedQua: !checkedQua })} />
                            <Body style={styles.checkBoxItem}>
                                <Text>Quarta-Feira</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <CheckBox checked={checkedQui} color="green" onPress={() => this.setState({ checkedQui: !checkedQui })} />
                            <Body style={styles.checkBoxItem}>
                                <Text>Quinta-Feira</Text>
                            </Body>
                            <CheckBox checked={checkedSex} color="green" onPress={() => this.setState({ checkedSex: !checkedSex })} />
                            <Body style={styles.checkBoxItem}>
                                <Text>Sexta-feira</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <CheckBox checked={checkedSab} color="green" onPress={() => this.setState({ checkedSab: !checkedSab })} />
                            <Body style={styles.checkBoxItem}>
                                <Text>Sábado</Text>
                            </Body>
                        </ListItem>
                    </View>
                    <View>
                        <Button style={styles.btnSalvar} onPress={() => { this.salvar(this.props.navigation) }}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Salvar Atividade</Text>
                        </Button>
                    </View>
                </ScrollView>
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
        backgroundColor: '#389B87',
        marginTop: 40
    },
    btnExcluir: {
        width: '40%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        marginTop: 40,
        marginLeft: 10,
        backgroundColor: '#389B87'
    },
    textHeader: {
        fontSize: 18,
        color: 'white',
        justifyContent: 'center',
        width: 250
    },
    checkBoxItem: {
        marginLeft: 5
    },
    checkBoxContainer: {
        padding: 100
    }
})

export default DetalhesAtividade;