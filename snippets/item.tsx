import type {Node} from 'react';
import React from 'react';
import { Hotel } from '../models/Hotel';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

const Item = (item: Hotel): Node => {
    const mainPic = !!item.gallery.length && item.gallery[0];
    return (
      <View style={styles.container}>
        <Image source={{uri:mainPic}} style={styles.avatar}/>
        <View style={styles.content}>
          <View style={styles.mainContentStyle}>
              <View style={styles.text}>
                  <Text style={styles.groupName}>{item.name}</Text>
              </View>
              <Text style={styles.info}>{item.stars} stars | {item.price} {item.currency} | {item.userRating} </Text>
              <Text style={styles.address}>
                {item.location?.address} - {item.location?.city}
              </Text>
          </View>
        </View>
      </View>
    );
  };


  const styles = StyleSheet.create({
    root: {
      backgroundColor: "#FFFFFF"
    },
    container: {
      padding: 16,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: "#808080",
      alignItems: 'flex-start'
    },
    avatar: {
      width:55,
      height:55,
      borderRadius:25,
    },
    text: {
      marginBottom: 5,
      flexDirection: 'row',
      flexWrap:'wrap'
    },
    content: {
      flex: 1,
      marginLeft: 16,
      marginRight: 0
    },
    mainContent: {
      marginRight: 60
    },
    memberImage: {
      height: 30,
      width: 30,
      marginRight:4,
      borderRadius:10,
    },
    separator: {
      height: 1,
      backgroundColor: "#CCCCCC"
    },
    info:{
      color:"#20B2AA"
    },
    address:{
      marginTop: 3,
      fontSize:12,
      color:"#696969"
    },
    groupName:{
      fontSize:18,
      color:"#5f9ea0",
      fontWeight: '500'
    },
    groupMembersContent:{
      flexDirection:'row',
      marginTop:10
    }
  });  


export default Item;