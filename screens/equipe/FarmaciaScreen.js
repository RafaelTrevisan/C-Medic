import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet, TextInput } from 'react-native';

import { Header, Left, Right, Container, Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { db } from "../../assets/Constante";


class FarmaciaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Nome: '',
            Endereco: '',
            Bairro: '',
            NumEnd: '',
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

    //Função Para salvar
    salvar = (nav) => {
        var { Nome, Endereco, Bairro, NumEnd, CEP, Cidade, Telefone, Email } = this.state
        if (Nome == '' || Endereco == '' || Bairro == '' || NumEnd == '' || CEP == '' || Cidade == '' || Telefone == '' || Email == '') {
            Alert.alert(
                'Atenção',
                'Preencha todos os campos antes de salvar!')
            return
        }
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO Farmacia (Nome, Endereco, Bairro,NumEnd,CEP,Cidade,Telefone, Email) VALUES (?,?,?,?,?,?,?,?)',
                [Nome, Endereco, Bairro, NumEnd, CEP, Cidade, Telefone, Email],
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
        });
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------//
    render() {
        return (
            <Container>
                <Header androidStatusBarColor={'black'} style={{ backgroundColor: '#389B87' }}>
                    <Left>
                        <Button icontLeft transparent>
                            <Icon name="arrow-left" style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.navigate('CarregarFarmacia')} />
                            <Text style={styles.textHeader}>  Adicionar Farmácia</Text>
                        </Button>
                    </Left>
                    <Right></Right>
                </Header>

                <View style={styles.viewCadastro}>
                    <View style={styles.viewIcon}>
                        <Icon name="clinic-medical" style={styles.Icon} />
                    </View>
                    <TextInput
                        style={styles.container}
                        placeholder="Nome da Farmácia"
                        underlineColorAndroid="#389B87"
                        onChangeText={(Nome) => this.setState({ Nome })}
                    />
                    <TextInput
                        style={styles.container}
                        placeholder="Rua"
                        underlineColorAndroid="#389B87"
                        onChangeText={(Endereco) => this.setState({ Endereco })}
                    />
                    <View style={{ width: '75%', flexDirection: 'row' }}>
                        <TextInput
                            style={{ width: '75%', fontSize: 18 }}
                            placeholder="Bairro"
                            underlineColorAndroid="#389B87"
                            onChangeText={(Bairro) => this.setState({ Bairro })}
                        />
                        <TextInput
                            style={{ width: '25%', fontSize: 18 }}
                            placeholder="Número"
                            underlineColorAndroid="#389B87"
                            keyboardType={'numeric'}
                            onChangeText={(NumEnd) => this.setState({ NumEnd })}
                        />
                    </View>
                    <View style={{ width: '75%', flexDirection: 'row' }} >
                        <TextInput
                            style={{ width: '35%', fontSize: 18 }}
                            placeholder="CEP"
                            underlineColorAndroid="#389B87"
                            keyboardType={'numeric'}
                            onChangeText={(CEP) => this.setState({ CEP })}
                        />
                        <TextInput
                            style={{ width: '65%', fontSize: 18 }}
                            placeholder="Cidade"
                            underlineColorAndroid="#389B87"
                            onChangeText={(Cidade) => this.setState({ Cidade })}
                        />
                    </View>
                    <TextInput
                        style={styles.container}
                        placeholder="Número do Telefone"
                        underlineColorAndroid="#389B87"
                        keyboardType={'numeric'}
                        onChangeText={(Telefone) => this.setState({ Telefone })}
                    />
                    <TextInput
                        style={styles.container}
                        placeholder="E-mail"
                        underlineColorAndroid="#389B87"
                        onChangeText={(Email) => this.setState({ Email })}
                    />

                    <Button style={styles.btnSalvar} onPress={() => { this.salvar(this.props.navigation) }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Salvar</Text>
                    </Button>
                </View>
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
        height: 85,
        marginBottom: 60
    },
    Icon: {
        fontSize: 70,
        marginBottom: 30,
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center'
    },
    btnSalvar: {
        width: '50%',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
        marginTop: 40,
        backgroundColor: '#389B87'
    }
})

export default FarmaciaScreen