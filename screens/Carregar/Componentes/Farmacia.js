import React, { Component } from 'react';

import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

// import { Container } from './styles';

export default class Farmacia extends Component {
    detalhes = (data) => {
        this.props.navigation.navigate('DetalhesFarmacia', {
            data
        })
    }
    render() {
        var { data } = this.props
        return (
            <ScrollView style={styles.Container}>
                <TouchableOpacity onPress={() => { this.detalhes(JSON.parse(data)) }}>
                    <Text>Nome: {JSON.parse(data).Nome}</Text>
                    <Text>Cidade: {JSON.parse(data).Cidade}</Text>
                    <Text>Telefone: {JSON.parse(data).Telefone}</Text>
                    <Text>E-mail: {JSON.parse(data).Email}</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 5
    }
})