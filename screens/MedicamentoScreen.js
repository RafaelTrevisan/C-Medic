import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header, Left, Right, Container, Button, Picker, CheckBox, ListItem, Body } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { db } from "../assets/Constante";


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
            Nome: '',
            Unidade: '',
            Quantidade: '',
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

    //Função Para salvar
    salvar = (nav) => {
        var { Nome, Unidade, Quantidade, hora, checkedDom, checkedSeg, checkedTer, checkedQua, checkedQui, checkedSex, checkedSab } = this.state

        if (Nome == '' || Unidade == '' || Quantidade == '' || hora == '000000') {
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

        var DiasSemana = ""
        if (checkedDom === true) {
            DiasSemana = DiasSemana + "0"
        }
        if (checkedSeg === true) {
            DiasSemana = DiasSemana + "1"
        }
        if (checkedTer === true) {
            DiasSemana = DiasSemana + "2"
        }
        if (checkedQua === true) {
            DiasSemana = DiasSemana + "3"
        }
        if (checkedQui === true) {
            DiasSemana = DiasSemana + "4"
        }
        if (checkedSex === true) {
            DiasSemana = DiasSemana + "5"
        }
        if (checkedSab === true) {
            DiasSemana = DiasSemana + "6"
        }

        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO Medicamento (Nome, Unidade, Quantidade) VALUES (?,?,?)',
                [Nome, Unidade, Quantidade],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        var medicamentoId = results.insertId.toString();
                        db.transaction((tx) => {
                            tx.executeSql(
                                'INSERT INTO MedicamentoHorario (DiaSemana, CodigoMedicamento, Hora) VALUES (?,?,?)',
                                [DiasSemana, medicamentoId, hora],
                                (tx, results) => {
                                    Alert.alert(
                                        'Informação',
                                        'Registro salvo com sucesso.',
                                        [
                                            {
                                                text: 'Ok',
                                                onPress: () =>
                                                    nav.navigate('CarregarMedicamento'),
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
    //Interagir
    handlePicker = (datetime) => {
        this.setState({
            isVisible: false,
            //('DD/MM/YY - HH:mm A')
            //data: moment(datetime).format('YYYYMMDD'),
            hora: moment(datetime).format('HHmm' + '00')
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
        //Ao renderizar irá pegar a unidade inicial, no caso Pilula(s)
        var { checkedDom, checkedSeg, checkedTer, checkedQua, checkedQui, checkedSex, checkedSab, hora } = this.state;

        return (
            <Container>
                <Header androidStatusBarColor={'black'} style={{ backgroundColor: '#389B87' }}>
                    <Left>
                        <Button icontLeft transparent>
                            <Icon name="arrow-left" style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.navigate('CarregarMedicamento')} />
                            <Text style={styles.textHeader}>  Adicionar Medicamento</Text>
                        </Button>
                    </Left>
                    <Right></Right>
                </Header>
                <ScrollView>
                    <View style={{ alignItems: 'center' }}>
                        <TextInput
                            style={styles.container}
                            placeholder="Nome do Medicamento"
                            underlineColorAndroid="#389B87"
                            onChangeText={(Nome) => this.setState({ Nome })}
                        />
                        <Text style={styles.texto}>Unidade</Text>
                        <Picker style={styles.pickerStyle}
                            //Prop para selecionar o valor
                            selectedValue={this.state.Unidade}
                            //Prop para Mudar de valores no Picker
                            //itemValue vai receber o value de cada picker e não o label
                            //itemIndex recebe o numero da posição de cada picker
                            onValueChange={(itemValue, itemIndex) =>
                                //setState serve para manipular a variavel state que foi criado no constructor
                                this.setState({ Unidade: itemValue })}>
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
                            onChangeText={(Quantidade) => this.setState({ Quantidade })}
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
                            <Text style={{ color: 'white', fontSize: 20 }}>Salvar Medicamento</Text>
                        </Button>
                    </View>
                </ScrollView>
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
        backgroundColor: '#389B87',
        marginTop: 40
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

export default MedicamentoScreen;