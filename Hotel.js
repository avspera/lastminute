import React from 'react';
import {Alert, View, Modal, ScrollView, Image, Text, TouchableOpacity
} from 'react-native';
import theme from './styles/theme';
import ImageViewer from 'react-native-image-zoom-viewer';
import { SliderBox } from "react-native-image-slider-box";
// import {FontAwesome5} from 'react-native-vector-icons';
import styles from './styles/hotel';
export default class Hotel extends React.Component {

  constructor(props) {
      super(props);

      let routes = this.props.route;
      this.state = {
        isLoading: true,
        isLoadingImage: false,
        isConnected: false,
        hotel : routes.params.item,
        isVisibleOverlayImage: false
      };
    }
      
  componentDidMount= async()=>{
    this.props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => { this.props.navigation.goBack()}}>
          <Text style={{paddingLeft: 10, fontSize: 15, fontWeight: '500'}}>BACK</Text>
        </TouchableOpacity>
      )
    });

    this.setState({ isLoading: true, isLoadingImage: true});
    
    if(!this.state.hotel){
      Alert.alert("Ops...i can't find this hotel");
    }
  }

  renderTimes(label, value){
    return(
      <View style={styles.optionContainer}>
        <View style={{flex:1,flexDirection:'row'}}>
          <View style={{marginTop:10, marginBottom:5, alignContent:'flex-start', alignItems:'flex-start'}}>
            <Text style={[styles.listItem, {flexWrap: 'wrap', flex:1}]}>{label.toUpperCase()}</Text>
          </View>
          <View style={{marginRight:20, alignContent:'flex-end', alignItems:'flex-end', flex:1}}>
            <Text style={{color:theme.COLORS.PRIMARY, paddingTop:10, fontSize: 20}}>{value.from} - {value.to}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderStaticField(label, value){
    return(
      <View style={styles.optionContainer}>
        <View style={{flex:1,flexDirection:'row'}}>
          <View style={{marginTop:10, marginBottom:5, alignContent:'flex-start', alignItems:'flex-start'}}>
            <Text style={[styles.listItem, {flexWrap: 'wrap', flex:1}]}>{label.toUpperCase()}</Text>
          </View>
          <View style={{marginRight:20, alignContent:'flex-end', alignItems:'flex-end', flex:1}}>
            <Text style={{color:theme.COLORS.PRIMARY, paddingTop:10, fontSize: 20}}>{value}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderContacts(value){
    return(
      <View style={styles.contact}>
        {!!value.phoneNumber && <Text style={[styles.listItem]}>{value.phoneNumber}</Text>}
        {!!value.email && <Text style={[styles.listItem]}>{value.email}</Text>}
      </View>
    )
  }

  renderPrice(value, currency){
    return(
      <View style={styles.optionContainer}>
        <View style={{flex:1,flexDirection:'row'}}>
          <View style={{marginTop:10, marginBottom:5, alignContent:'flex-start', alignItems:'flex-start'}}>
            <Text style={[styles.listItem, {flexWrap: 'wrap', flex:1}]}>PRICE PER NIGHT</Text>
          </View>
          <View style={{marginRight:20, alignContent:'flex-end', alignItems:'flex-end', flex:1}}>
            <Text style={{color:theme.COLORS.PRIMARY, paddingTop:10, fontSize: 20}}>{`${value} ${currency}`}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderFotoGallery(gallery){
    return(
      <View style={styles.photoGallery}>
        <View style={styles.headerSection}>
          <View row>
            <Text style={styles.headerArea}>Foto Gallery: {gallery.length} </Text>
          </View>
        </View>
        {
          <SliderBox 
            circleLoop 
            imageLoadingColor={theme.COLORS.PRIMARY} 
            dotColor={theme.COLORS.PRIMARY} 
            images={gallery}
          />
        }
      </View>
    )
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  }

  render() {
    const { hotel, isVisibleOverlayImage} = this.state;
    const pic = !!hotel.gallery && hotel.gallery[0]
    return (
    
      <View style={{backgroundColor:theme.COLORS.WHITE}}>
        <View style={styles.hotelContainer}>
          <ScrollView style={[styles.scrollView]}>
            <Modal style={{top: '50%', left: '50%'}} animationType='fade' transparent={true} visible={isVisibleOverlayImage}>
              <ImageViewer 
                imageUrls={[{url:decodeURIComponent(pic)}]}
                onSwipeDown={() => {this.handleChange("isVisibleOverlayImage", false);}}
                enableSwipeDown={true}
              />
            </Modal>

            <View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{hotel.name}</Text>
              </View>

              {pic && 
                <TouchableOpacity onPress={() => this.setState({isVisibleOverlayImage: true})}>
                  <Image 
                    onLoadStart={() => {this.handleChange("imageLoading", true)}} 
                    onLoadEnd={() => {this.handleChange("imageLoading", false)}} 
                    style={styles.hotelPic} resizeMode="cover" 
                    source={{uri: decodeURIComponent(pic)}}/>
                </TouchableOpacity>
              }

              {this.renderContacts(hotel.contact)}
              {this.renderStaticField("stars", hotel.stars)}
              {this.renderStaticField("Rating", hotel.userRating)}
              {this.renderPrice(hotel.price, hotel.currency)}
              {this.renderTimes("Check In", hotel.checkIn)}
              {this.renderTimes("Check Out", hotel.checkOut)}
              {this.renderFotoGallery(hotel.gallery)}

            
          </View>
        </ScrollView>
        </View>
      </View>
    );
  }
}