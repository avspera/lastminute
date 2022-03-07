
import {Dimensions, StyleSheet} from  'react-native'
import theme from './theme';

const {width} = Dimensions.get('screen');
export default StyleSheet.create({
  hotelCountContainer:{
    padding: 10,
    backgroundColor: '#5f9ea0',
  },
  countText:{
    fontSize: 16,
    color: 'white',
    fontWeight: '500'
  },
  inputText:{
    borderColor: theme.COLORS.PRIMARY,
    borderWidth:1,
    borderRadius: 20,
    height: 40,
    padding: 10,
    backgroundColor: theme.COLORS.WHITE
  },
  dashboardContainer: {
    display: 'flex', 
    flexDirection: 'row',
  },
   halfRow: {
     width: width*0.45,
     margin: 5
   },
   dropdown:{
     paddingRight: 5,
     borderRadius: 20,
     height: 40,
     backgroundColor: theme.COLORS.WHITE
   }
});