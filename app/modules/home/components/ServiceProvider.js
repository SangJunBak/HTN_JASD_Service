import React, {PureComponent} from 'react';
import { ListItem , Card} from 'react-native-elements'
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList
} from 'react-native';

class ServiceProvider extends PureComponent {

    constructor(props){
        super(props);
    }


    render() {


        return (
            <Card
                class="serviceProvider"
                title={this.props.userData.username}
                titleStyle={{textAlign:"center"}}
            >
                <View style={{
                    flex:1,
                    flexDirection:"row",
                    justifyContent:"space-between",
                    alignItems: "center"
                }}>
                {this.props.userData.profilepic ?
                    <Image
                        style={{
                            borderRadius:16,
                            width: 80,
                            height: 80,
                            padding:4
                        }}
                        source={{uri: `${this.props.userData.profilepic}` }}
                    /> :
                    <Image
                        style={{
                            borderRadius:16,
                            width: 80,
                            height: 80,
                            padding:4
                        }}
                        source={{uri: `https://i.pinimg.com/236x/e4/88/ab/e488ab244c2477d1a91ee5a1dee8ab91.jpg` }}
                    />
                }

                    <Text style={{width:"70%", padding:4, textAlign:"center"}}>
                        {this.props.userData.description ? this.props.userData.description : `I braid hair for a living. I'm pretty good.`}
                    </Text>
                </View>
                <View style={{
                    flex:1,
                    flexDirection:"row",
                    justifyContent:"space-evenly",
                    alignItems: "center",
                    paddingTop: 32
                }}>
                    {this.props.userData.images ?
                        <Image style={{borderRadius:16, width: 120, height: 120, padding:4}}
                               source={{uri: `${this.props.userData.images['0'].pic}` }}
                        /> :
                        <Image style={{borderRadius:16, width: 120, height: 120, padding:4}}
                               source={{uri: `http://coolmenshair.com/wp-content/uploads/01.jpg` }}
                        />
                    }
                    {this.props.userData.images ?
                        <Image style={{borderRadius:16, width: 120, height: 120, padding:4}}
                               source={{uri: `${this.props.userData.images['1'].pic}` }}
                        /> :
                        <Image style={{borderRadius:16, width: 120, height: 120, padding:4}}
                               source={{uri: `https://jenniferanistonhairstyles.com/wp-content/uploads/2018/08/dreads-hairstyles-for-guys-84335-dread-hairstyles-for-men-pictures-12-awesome-loc-hairstyles-for-men-of-dreads-hairstyles-for-guys.jpg` }}
                        />
                    }
                </View>


            </Card>
        );
    }


}


export default ServiceProvider;
