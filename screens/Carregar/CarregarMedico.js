import React, { Component } from 'React';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Header, Left, Right, Container, Button, Body, Picker, Label } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { db } from "../../assets/Constante";
import Medico from "./Componentes/Medico";

class CarregarMedico extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

//Função para Listar os Medicos ja cadastrados
componentDidMount() {
    var data = []
    db.transaction((tx) => {
        tx.executeSql(
            'select * from Medico',
            [],
            (tx, results) => {
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    var _row = JSON.stringify(row);
                    data.push(_row)
                }
                this.setState({ data })
            });
    });
}

    //Drawer Navigation(Icones e Estilização)
    static navigationOptions = {
        drawerLabel: () => null,
        drawerLockMode: "locked-closed", //->Impede de abrir o Drawer na lateral
        header: null
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header androidStatusBarColor={'black'} style={{ backgroundColor: '#389B87' }}>
                    <Left>
                        <Button icontLeft transparent>
                            <Icon name="arrow-left" style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.navigate("Equipe")} />
                        </Button>
                    </Left>
                    <Right>
                        <Button iconRight transparent>
                            <Text style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.navigate("Medico")}>Adicionar</Text>
                        </Button>
                    </Right>
                </Header>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item) => (JSON.parse(item).Codigo.toString())}
                    renderItem={({ item }) => <Medico navigation = {this.props.navigation} data={item} />}
                />
            </Container>
        );
    }
}

//-------------------------------------------------------------------------------------------/
const styles = StyleSheet.create({
    iconMenuCabecalho: {
        fontSize: 20,
        color: 'white'
    },
    container: {
        backgroundColor: "#ddd"
    }
})

export default CarregarMedico;