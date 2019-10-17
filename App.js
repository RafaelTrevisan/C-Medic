import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import { createDrawerNavigator, DrawerItems, createStackNavigator, createSwitchNavigator } from 'react-navigation'

//Paginas Importadas
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'
import EquipeScreen from './screens/EquipeScreen'
import MedicamentoScreen from './screens/MedicamentoScreen'
import AtividadeScreen from './screens/AtividadeScreen'
import MedicoScreen from './screens/equipe/MedicoScreen'
import FarmaciaScreen from './screens/equipe/FarmaciaScreen'
import CuidadorScreen from './screens/equipe/CuidadorScreen'
import TreinadorScreen from './screens/equipe/TreinadorScreen'
import CarregarMedico from "./screens/Carregar/CarregarMedico";
import CarregarFarmacia from "./screens/Carregar/CarregarFarmacia";
import CarregarTreinador from "./screens/Carregar/CarregarTreinador";
import CarregarCuidador from "./screens/Carregar/CarregarCuidador";
import CarregarMedicamento from "./screens/Carregar/CarregarMedicamento";
import DetalhesMedico from "./screens/equipe/DetalhesMedico"
import DetalhesFarmacia from "./screens/equipe/DetalhesFarmacia"
import DetalhesCuidador from "./screens/equipe/DetalhesCuidador"
import DetalhesTreinador from "./screens/equipe/DetalhesTreinador"

//Ao clicar no Header puxar toda a tela para a direita
const { width } = Dimensions.get('window')

export default class App extends React.Component {
  render() {
    return (
      <SwitchNavigation />
    );
  }
}

//Estilização do Drawer no Home
const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{
      height: 150, backgroundColor: '#4ACCB2', alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Image source={require('./assets/image/Logo1.png')} style={{ height: 100, width: 240 }} />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)


//Menu Drawer Navigation
const AppDrawerNavigator = createDrawerNavigator({
  Início: HomeScreen,
  Medicamento: MedicamentoScreen,
  Atividade: AtividadeScreen,
  Equipe: EquipeScreen,
  Configurações: SettingsScreen
},
  {
    contentComponent: CustomDrawerComponent,
    //drawerWidth: width,
    contentOptions: {
      activeTintColor: 'orange'
    }
  })

  //Menu Stack para acessar Equipe
const StackEquipe = createStackNavigator({
  Medico: MedicoScreen,
  Farmacia: FarmaciaScreen,
  Cuidador: CuidadorScreen,
  Treinador: TreinadorScreen,
  CarregarMedico: CarregarMedico,
  CarregarFarmacia: CarregarFarmacia,
  CarregarTreinador: CarregarTreinador,
  CarregarCuidador: CarregarCuidador,
  CarregarMedicamento: CarregarMedicamento,
  DetalhesMedico: DetalhesMedico,
  DetalhesFarmacia: DetalhesFarmacia,
  DetalhesCuidador: DetalhesCuidador,
  DetalhesTreinador: DetalhesTreinador
})

const SwitchNavigation = createSwitchNavigator({
  Home: AppDrawerNavigator,
  StackEquipe: StackEquipe
})