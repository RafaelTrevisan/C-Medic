import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Header, Left, Right, Container, Button, Body } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5'

class SettingScreen extends Component {

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="cog" style={{ fontSize: 23, color: tintColor, width: 30 }} />
        )
    }

    render() {
        return (
            <Container>
                <Header androidStatusBarColor={'black'} style={{ backgroundColor: '#389B87' }}>
                    <Left>
                        <Button icontLeft transparent>
                        <Icon name="align-justify" style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.openDrawer()} />
                        <Text style={{ fontSize: 20, color: 'white', justifyContent: 'center', width: width = 200 }}>  Configurações</Text>
                        </Button>
                    </Left>
                    <Right></Right>
                    <Body>
                        
                    </Body>
                    <Right></Right>
                </Header>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, right: 10 }}>Em Manutenção...</Text>
                </View>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    iconMenuCabecalho: {
        fontSize: 30,
        color: 'white'
    }
})

export default SettingScreen;

