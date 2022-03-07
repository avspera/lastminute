import { StyleSheet} from 'react-native';
import theme from './theme';

export default StyleSheet.create({

    headerSection:{
        margin:10,
        borderBottomColor:theme.COLORS.PRIMARY,
        borderBottomWidth: 2,
        padding:5
    },

    headerArea:{
        fontSize:19,
        fontWeight:'bold',
        marginTop: 10
    },

    description:{
        fontSize:16,
        letterSpacing: 0.5,
        color: theme.COLORS.GREY,
        fontWeight: '500'
    },

    titleContainer:{
        padding:5,
        backgroundColor: theme.COLORS.PRIMARY

    },
    
    title: {
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 1.2,
        textAlign: 'center',
        color: theme.COLORS.WHITE
    },

    hotelPic:{
        height:150,
        marginTop: 10,
        marginBottom: 10,
    },

    optionContainer : {
        marginTop: 5,
        borderTopWidth: 2,
        display:'flex',
        borderColor:theme.COLORS.PRIMARY
    },

    listItem:{
        fontSize:18,
        paddingLeft:10
    },

    hotelContainer: {
        paddingBottom:20,
    },

    contact:{
        flex:1,
        flexDirection:'row', 
        marginBottom:5, 
        alignContent:'flex-start', 
        alignItems:'flex-start'
    },
    
    photoGallery:{
        marginTop: 20
    },
})