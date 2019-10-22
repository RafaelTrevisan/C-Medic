import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header, Left, Right, Container, Button, Picker, CheckBox, ListItem, Body } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { db } from "../../assets/Constante";

//------------------------------------Classe---------------------------------------------------//
class DetalhesMedico extends Component {
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
    //Drawer Navigation(Icones e Estilização)
    static navigationOptions = {
        drawerLabel: () => null,
        drawerLockMode: "locked-closed", //->Impede de abrir o Drawer na lateral
        header: null
    }

    componentDidMount() {
        const { navigation } = this.props;
        const data = navigation.getParam('data');
        this.setState({ Nome: data.Nome, Unidade: data.Unidade, Quantidade: data.Quantidade })

        db.transaction((tx) => {
            tx.executeSql(
                `select * from MedicamentoHorario Where CodigoMedicamento = ${data.Codigo.toString()}`,
                [],
                (tx, results) => {
                    var len = results.rows.length;
                    var row = '';
                    for (let i = 0; i < len; i++) {
                        row = results.rows.item(i);
                    }
                    this.setState({hora:row.Hora})
                    var qtd = row.DiaSemana.length;
                    for (let i = 0; i < qtd; i++) {
                        var dia = row.DiaSemana.slice(i, i + 1);
                        if (dia == 0) {
                            this.setState({ checkedDom: true })
                        }
                        if (dia == 1) {
                            this.setState({ checkedSeg: true })
                        }
                        if (dia == 2) {
                            this.setState({ checkedTer: true })
                        }
                        if (dia == 3) {
                            this.setState({ checkedQua: true })
                        }
                        if (dia == 4) {
                            this.setState({ checkedQui: true })
                        }
                        if (dia == 5) {
                            this.setState({ checkedSex: true })
                        }
                        if (dia == 6) {
                            this.setState({ checkedSab: true })
                        }
                    }
                });
        });
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------//
    //Função Para salvar
    salvar = (nav) => {
        const { navigation } = this.props;
        const data = navigation.getParam('data');
        const codigo  = data.Codigo.toString(); 
        var { Nome, Unidade, Quantidade, hora, checkedDom, checkedSeg, checkedTer, checkedQua, checkedQui, checkedSex, checkedSab } = this.state
        var DiasSemana = '123'
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
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE Medicamento as m join MedicamentoHorario as mh on m.Codigo = mh.CodigoMedicamento ' +
                'set m.Nome = ?, m.Unidade, m.Quantidade, mh.DiaSemana, mh.Hora where m.Codigo = ?',
                [Nome, Unidade, Quantidade, DiaSemana, Hora],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
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
                                'DELETE Medicamento, MedicamentoHorario FROM MEDICAMENTO ' +
                                ' join MedicamentoHorario  on MEDICAMENTO.Codigo = MedicamentoHorario.CodigoMedicamento  WHERE CODIGO = ?',
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
    //----------------------------------------------------------------------------------------------------------------------------------------------//
    render() {
        const { navigation } = this.props;
        const data = navigation.getParam('data');
        //Ao renderizar irá pegar a unidade inicial, no caso Pilula(s)
        var { checkedDom, checkedSeg, checkedTer, checkedQua, checkedQui, checkedSex, checkedSab, hora, Nome, Unidade, Quantidade } = this.state;

        return (
            <Container>
                <Header androidStatusBarColor={'black'} style={{ backgroundColor: '#389B87' }}>
                    <Left>
                        <Button icontLeft transparent>
                            <Icon name="arrow-left" style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.navigate('CarregarMedicamento')} />
                            <Text style={styles.textHeader}>  Alterar Medicamento</Text>
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
                            value={Nome}
                        />
                        <Text style={styles.texto}>Unidade</Text>
                        <Picker style={styles.pickerStyle}
                            //Prop para selecionar o valor
                            selectedValue={Unidade}
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
                            value={Quantidade.toString()}
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
                    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        <Button style={styles.btnSalvar} onPress={() => { this.salvar(this.props.navigation, data.Codigo) }}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Salvar</Text>
                        </Button>

                        <Button style={styles.btnExcluir} onPress={() => { this.excluir(this.props.navigation, data.Codigo) }}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Exluir</Text>
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
        width: '40%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        marginTop: 40,
        marginRight: 10,
        backgroundColor: '#389B87'
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

export default DetalhesMedico