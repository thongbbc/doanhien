import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,
    Animated,Easing,FlatList,ScrollView
    , KeyboardAvoidingView , TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {width,height} from '../../helperScreen'
import {connect} from 'react-redux';
import * as action from '../../actions/actionMain'


import Header from '../../component/header'






class MainScreen extends Component {
    constructor(props) {
        super(props)
        this.animationMain1=new Animated.Value(1)
        this.animationMain2=new Animated.Value(0)
        this.animationMain3=new Animated.Value(0)
    }    
    onSwipeRight(gestureState) {
        this.props.onOrOffAnimating(!this.props.animating)
    }    
    createAnimation = (value, duration,toValue) =>{
        return Animated.timing(
            value,
            {
                toValue: toValue,
                duration,
                easing:Easing.linear
            }
        )
    }
    animatingMain(value) {
        const duration = 500
        if (value) {
            Animated.parallel([
                this.createAnimation(this.animationMain1,duration,-850),
                this.createAnimation(this.animationMain2,duration,1),
                this.createAnimation(this.animationMain3,duration,1)
            ]).start()
            
        } else {
            Animated.parallel([
                this.createAnimation(this.animationMain1,2000,1),
                this.createAnimation(this.animationMain2,duration,0),
                this.createAnimation(this.animationMain3,duration,0)
            ]).start()
        }
    }




    render() {
        this.animatingMain(this.props.animating)
        const animationMain33 = this.animationMain2.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '60deg']
        })
        const animationMain22 = this.animationMain3.interpolate({
            inputRange: [0, 1],
            outputRange: [0, (width * 0.24)]
        })


        return(
        <View style = {{flex:1}}>
            {
                //DRAWER LAYOUT
            }
            <View style = {{position:'absolute',width,height,backgroundColor:'gray',flexDirection:'row'}}>
                <View style = {{flex:0.5,justifyContent:'center',alignItems:'center'}}>
                    <View style = {{flex:0.5,alignItems:'center'}}>
                        <TouchableOpacity style = {{marginBottom:20}}>
                            <View style = {{width:width/2-20,height:40,backgroundColor:'transparent',
                            borderWidth:1,borderColor:'white',
                            borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                                <Text style = {{color:'white',fontWeight:'bold'}}>HELLO</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style = {{marginBottom:20}}>
                            <View style = {{width:width/2-20,height:40,backgroundColor:'transparent',
                            borderWidth:1,borderColor:'white',
                            borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                                <Text style = {{color:'white',fontWeight:'bold'}}>HELLO</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>{
                            this.props.onOrOffAnimating(!this.props.animating)
                            this.props.navigation.goBack(null)}}>
                            <View style = {{width:width/2-20,height:40,backgroundColor:'transparent',
                            borderWidth:1,borderColor:'white',
                            borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                                <Text style = {{color:'white',fontWeight:'bold'}}>LOGOUT</Text>
                            </View>
                        </TouchableOpacity>
                        
                    </View>
                </View>
                <View style = {{flex:0.5,backgroundColor:'gray'}}/>
            </View>





            <View>
                <Animated.View style = {{position:'absolute',height,width,
                    transform: [
                        { perspective: this.animationMain1 },
                        { translateX: animationMain22 },
                        { rotateY: animationMain33},
                    ]
                }}>
                <LinearGradient style = {{width,height}} colors = {['#F58163','#945A4A','#372416']}>
                    <Header>
                        <TouchableOpacity onPress = {()=>{
                            this.props.onOrOffAnimating(!this.props.animating)
                        }}>
                            <Icon name="list" size={30} color="white" />
                        </TouchableOpacity>
                        <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Text style = {{color:'white',fontWeight:'bold',fontSize:15,paddingBottom:10}}>WELCOME</Text>
                        </View>
                        <View style = {{width:30,height:30}}/>
                    </Header>
                    <View style = {{backgroundColor:'white',flex:1}}>
                        
                    </View>
                    </LinearGradient>
                    {this.props.animating==true?(
                        <TouchableWithoutFeedback 
                        onPress = {()=>{this.props.onOrOffAnimating(!this.props.animating)}}
                        style = {{width,height,position:'absolute'}}>
                            <View style = {{width,height,position:'absolute'}}/>
                        </TouchableWithoutFeedback>
                    ):null
                    }
                </Animated.View>
                </View>
                
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        animating:state.animatingDrawer
    }
};
export default connect (mapStateToProps,action)(MainScreen);