import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Vibration, Alert } from 'react-native';
import { Header, Left, Right, Container, Button, Body, Content, Image } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { db } from "../assets/Constante";
import moment from 'moment';

//------------------------------------Classe---------------------------------------------------//
class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        setInterval(() => {
            db.transaction((tx) => {
                var dia = new Date().getDay();
                var hora = moment().format('HHmm' + '00');
                console.log(hora)
                var row = ''
                tx.executeSql(
                    'SELECT * from Medicamento ' +
                    'join MedicamentoHorario ' +
                    'on Medicamento.Codigo = MedicamentoHorario.CodigoMedicamento ' +
                    `where MedicamentoHorario.DiaSemana like "%${dia.toString()}%" `+
                    `and MedicamentoHorario.Hora = "${hora.toString()}"`,
                    [],
                    (tx, results) => {
                        if (results.rows.length > 0) {
                            var len = results.rows.length;
                            for (let i = 0; i < len; i++) {
                                row = results.rows.item(i);
                            }
                            const DURATION = 10000;
                            const PATTERN = [1000, 2000, 3000];
                            Vibration.vibrate(PATTERN, true)

                            Alert.alert(
                                'Atenção',
                                'Hora de tomar o remedio ' + row.Nome + ' com a quantidade: ' + row.Quantidade,
                                [
                                    {
                                        text: 'Parar de vibrar',
                                        onPress: () => {
                                            Vibration.cancel();
                                        },
                                    },
                                ],
                                { cancelable: false }
                            );
                        }
                    }
                );
            });
        }, 30000);
    }

    //Drawer Navigation(Icones e Estilização)
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="home" style={{ fontSize: 23, color: tintColor, width: 30 }} />
        )
    }

    render() {
        return (
            <Container >
                <Header androidStatusBarColor={'black'} style={{ backgroundColor: '#389B87' }}>
                    <Left>
                        <Button icontLeft transparent>
                            <Icon name="align-justify" style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.openDrawer()} />
                            <Text style={{ fontSize: 20, color: 'white', justifyContent: 'center' }}>  Início</Text>
                        </Button>
                    </Left>
                    <Right></Right>
                </Header>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name="bell" style={styles.iconBell} />
                    <Text style={{ marginBottom: 40, fontSize: 20 }}>ADICIONE SEU LEMBRETE</Text>

                    <Button iconLeft style={styles.btnMedicamento} onPress={() => this.props.navigation.navigate('CarregarMedicamento')}>
                        <Icon name='pills' style={styles.iconCustom} />
                        <Text style={{ fontSize: 20, right: 10 }}>Adicionar Medicamento</Text>
                    </Button>

                    <Button iconLeft style={styles.btnAtividade} onPress={() => this.props.navigation.navigate('Atividade')}>
                        <Icon name='running' style={styles.iconCustom} />
                        <Text style={{ fontSize: 20, right: 50 }}> Adicionar Atividade </Text>
                    </Button>

                    <Button iconLeft style={styles.btnEquipe} onPress={() => this.props.navigation.navigate('Equipe')}>
                        <Icon name='users' style={styles.iconCustom} />
                        <Text style={{ fontSize: 20, right: 80 }}>Adicionar Equipe</Text>
                    </Button>

                    <Button iconLeft style={styles.btnConfiguracoes} onPress={() => this.props.navigation.navigate('Configurações')}>
                        <Icon name='cog' style={styles.iconCustom} />
                        <Text style={{ fontSize: 20, right: 105 }}>Configurações</Text>
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
    btnMedicamento: {
        alignSelf: 'center',
        backgroundColor: 'white',
        height: 65,
        width: 300,
        //width:Dimensions.get('window').width,
        //height: Dimensions.get('window').height
        //https://github.com/marudy/react-native-responsive-screen
        borderRadius: 2,

    },
    btnAtividade: {
        alignSelf: 'center',
        backgroundColor: 'white',
        height: 65,
        width: 300,
        borderRadius: 2,
        top: 2,

    },
    btnEquipe: {
        alignSelf: 'center',
        backgroundColor: 'white',
        height: 65,
        width: 300,
        borderRadius: 2,
        top: 4
    },
    btnConfiguracoes: {
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
    },
    iconBell: {
        fontSize: 70,
        marginBottom: 30,
        color: '#389B80'
    }
})

export default HomeScreen;
