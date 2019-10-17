import React, { Component } from 'react';

import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class Medicamento extends Component {
    detalhes = (data) => {
        this.props.navigation.navigate('DetalhesMedicamento', {
            data
        })
    }
    render() {
        var { data } = this.props
        return (
            <ScrollView style={styles.Container}>
                <TouchableOpacity onPress={() => { this.detalhes(JSON.parse(data)) }}>
                    <Text>Nome: {JSON.parse(data).Nome}</Text>
                    <Text>Unidade: {JSON.parse(data).Unidade}</Text>
                    <Text>Quantidade: {JSON.parse(data).Quantidade}</Text>
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