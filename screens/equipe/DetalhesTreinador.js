import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';

import { Header, Left, Right, Container, Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { db } from "../../assets/Constante";

//------------------------------------Classe---------------------------------------------------//
class DetalhesTreinador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Nome: '',
            Especialidade: '',
            Endereco: '',
            CEP: '',
            Cidade: '',
            Telefone: '',
            Email: ''
        };
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
        this.setState({ Nome: data.Nome })
        this.setState({ Especialidade: data.Especialidade })
        this.setState({ Endereco: data.Endereco })
        this.setState({ CEP: data.CEP })
        this.setState({ Cidade: data.Cidade })
        this.setState({ Telefone: data.Telefone })
        this.setState({ Email: data.Email })
    }
    //Função Para salvar
    salvar = (nav, Codigo) => {
        console.log(Codigo)
        var { Nome, Especialidade, Endereco, CEP, Cidade, Telefone, Email } = this.state
        if (Nome == '' || Especialidade == '' || Endereco == '' || CEP == '' || Cidade == '' || Telefone == '' || Email == '') {
            Alert.alert(
                'Atenção',
                'Preencha todos os campos antes de salvar!')
            return
        }

        //função alterar
        db.transaction(function (tx) {
            tx.executeSql(
                'UPDATE Treinador SET Nome = ?, Especialidade = ?, Endereco = ?,CEP = ?,Cidade = ?,Telefone = ?,Email = ? WHERE Codigo = ?',
                [Nome, Especialidade, Endereco, CEP, Cidade, Telefone, Email, Codigo],
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
                                        nav.navigate('Equipe')
                                    ,
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
                                'DELETE FROM TREINADOR WHERE CODIGO = ?',
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
                                                        nav.navigate('Equipe'),
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
    //----------------------------------------------------------------------------------------------------------------------------------------------//
    render() {
        const { navigation } = this.props;
        const data = navigation.getParam('data');
        return (
            <Container>
                <Header androidStatusBarColor={'black'} style={{ backgroundColor: '#389B87' }}>
                    <Left>
                        <Button icontLeft transparent>
                            <Icon name="arrow-left" style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.navigate('CarregarTreinador')} />
                            <Text style={styles.textHeader}>  Alterar Treinador</Text>
                        </Button>
                    </Left>
                    <Right></Right>
                </Header>
                <ScrollView>
                    <View style={styles.viewCadastro}>
                        <View style={styles.viewIcon}>
                            <Icon name="user" style={styles.Icon} />
                        </View>
                        <TextInput
                            style={styles.container}
                            placeholder="Nome"
                            underlineColorAndroid="#389B87"
                            onChangeText={(Nome) => this.setState({ Nome })}
                            value={this.state.Nome}
                        />
                        <TextInput
                            style={styles.container}
                            placeholder="Especialidade"
                            underlineColorAndroid="#389B87"
                            onChangeText={(Especialidade) => this.setState({ Especialidade })}
                            value={this.state.Especialidade}
                        />
                        <TextInput
                            style={styles.container}
                            placeholder="Endereço"
                            underlineColorAndroid="#389B87"
                            onChangeText={(Endereco) => this.setState({ Endereco })}
                            value={this.state.Endereco}
                        />
                        <View style={{ width: '75%', flexDirection: 'row' }} >
                            <TextInput
                                style={{ width: '35%', fontSize: 18 }}
                                placeholder="CEP"
                                underlineColorAndroid="#389B87"
                                keyboardType={'numeric'}
                                onChangeText={(CEP) => this.setState({ CEP })}
                                value={this.state.CEP.toString()}
                            />
                            <TextInput
                                style={{ width: '65%', fontSize: 18 }}
                                placeholder="Cidade"
                                underlineColorAndroid="#389B87"
                                onChangeText={(Cidade) => this.setState({ Cidade })}
                                value={this.state.Cidade}
                            />
                        </View>
                        <TextInput
                            style={styles.container}
                            placeholder="Número do Telefone"
                            underlineColorAndroid="#389B87"
                            keyboardType={'numeric'}
                            onChangeText={(Telefone) => this.setState({ Telefone })}
                            value={this.state.Telefone}
                        />
                        <TextInput
                            style={styles.container}
                            placeholder="E-mail"
                            underlineColorAndroid="#389B87"
                            onChangeText={(Email) => this.setState({ Email })}
                            value={this.state.Email}
                        />
                        <View style={{ justifyContent: 'center', width: '75%', flexDirection: 'row' }}>
                            <Button style={styles.btnSalvar} onPress={() => { this.salvar(this.props.navigation, data.Codigo) }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>Salvar</Text>
                            </Button>

                            <Button style={styles.btnExcluir} onPress={() => { this.excluir(this.props.navigation, data.Codigo) }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>Exluir</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}
//----------------------------------------------------------------------------------------------------/

const styles = StyleSheet.create({
    iconMenuCabecalho: {
        fontSize: 23,
        color: 'white'
    },
    container: {
        width: "75%",
        fontSize: 18,
    },
    textHeader: {
        fontSize: 20,
        color: 'white',
        justifyContent: 'center',
        width: 200
    },
    viewCadastro: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 120
    },
    viewIcon: {
        backgroundColor: '#DADADA',
        borderRadius: 100,
        width: 85,
        height: 85
    },
    Icon: {
        fontSize: 70,
        marginBottom: 30,
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center'
    },
    btnSalvar: {
        width: '40%',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
        marginTop: 40,
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
    }
})

export default DetalhesTreinador