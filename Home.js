/* eslint-disable prettier/prettier */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 * @author Antonio Vincenzo Spera
 */
import React from 'react';
import {
  RefreshControl,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  View,
  Alert,
  Keyboard,
  TextInput,
  Text,
  FlatList
} from 'react-native';
import styles from './styles/home'
import Item from './snippets/item';
import Header from './snippets/Header';
import NoData from './snippets/NoData';
import SelectDropdown from 'react-native-select-dropdown'
import theme from './styles/theme';

/**
 * render list of weights
 * @param {} list => List of items
 * @param {} title => header title
 */

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isConnected: false,
      hotels: [],
      emptyListMessage: '',
      searchText: '',
      textInputRef: null,
      sort_by: "RATING ASC",
      openDropDown: false,
      sort_by_options: [
       'RATING ASC', "RATING DESC",
      ]
    };
  }

  componentDidMount = async () => {
    this.getData();
  };

  getData = async () => {
    const url = 'https://run.mocky.io/v3/eef3c24d-5bfd-4881-9af7-0b404ce09507';
    this.setState({isLoading: true});
    fetch(url, {method: 'GET'})
      .then(response => response.json())
      .then(response => {
        !!response && this.setState({hotels: response});
      })
      .catch(error => {
        this.setState({isLoading: false});
        Alert.alert('Ops...we have a problem here!');
        console.log('error', error);
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  filterResults = (text) => {
    const currentList = this.state.hotels
    console.log("length", text.length)  
    let results = [];
    if(text){
      results = currentList.filter(item => item.name.includes(text))
    }
    else{
      console.log("so clearing");
      this._clearInput();
    }
      

    this.setState({hotels: results});
  }

  _onRefresh= async () => {
    this.getData();
  }

  _sortItems = (value, index) => {
    console.log("orderBy", value)
    
    this.setState({order_by: value})

    if(value.length == 0){
      this.getData();
      return;
    }

    if(value.includes("DESC") > 0){
      this.setState(hotels => {
        this.state.hotels.sort((a, b) => (b.userRating - a.userRating))
      });
    }else{
      this.setState(hotels => {
        this.state.hotels.sort((a, b) => (a.userRating - b.userRating))
      });
    }

  }

  _clearInput = ()  => {
    this.textInputRef.clear();
    this.getData()
  }

  setOpen(openDropDown) {
    this.setState({openDropDown});
  }

  render() {
    const {hotels, isDarkMode, isLoading,
            order_by, sort_by_options} = this.state;
    const {navigation} = this.props
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Header />
        <View style={styles.dashboardContainer}>
          <View style={styles.halfRow}>
            <TextInput
              clearButtonMode="always"
              placeholder="Search here by name"
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={text => {
                this.filterResults(text);
              }}
              style={styles.inputText}
              autoCapitalize="none"
              ref={(reference) => this.textInputRef = reference}
            />
          </View>

          <View style={styles.halfRow}>
            <SelectDropdown
              data={sort_by_options}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                this._sortItems(selectedItem, index)
              }}
              value={order_by}
              defaultButtonText="Order by"
              buttonStyle={styles.dropdown}
              buttonTextStyle={{fontSize: 15, color: theme.COLORS.GREY}}
            />
          </View>
        </View>

        <View style={styles.hotelCountContainer}>
          <Text style={styles.countText}>
            Found: {hotels.length} hotels
          </Text>
        </View>
        

        <View style={{display: 'flex', flex: 1}}>
          {hotels.length > 0 ? (
            <FlatList
              initialNumToRender={20}
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={this._onRefresh} />
              }
              data={hotels}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item, index }) => (
                <View key={index}>
                  <TouchableOpacity onPress={() => navigation.navigate("Hotel", {item: item, title:`${item.name} details`})}>
                    <Item {...item} />
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            <NoData text="Can't find what you are looking for"/>
          )}
        </View>

      </SafeAreaView>
    );
  }
}
