import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import DateParser from '../Utils/DateParser'
import Images from '../Themes/Images'
import Fonts from '../Themes/Fonts'
import Metrics from '../Themes/Metrics'
import Colors from '../Themes/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'

export default class SingleReportScreen extends Component {
  constructor (props) {
    super(props)
    this.marker = props.navigation.state.params.marker
    this.imgUri = (this.marker.url == null) ? Images.defaultReportPicture : { uri: this.marker.url }
    this.state = {
      voted: null
    }
    const { date, time } = DateParser.timestampToItalianDate(this.marker.timestamp)
    this.date = date
    this.time = time
  }
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'dodgerblue'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text accessibilityLabel='title-singlereport'
            testID={'title-singlereport'}
            style={styles.title}>{this.marker.title}</Text>
          <Text accessibilityLabel='address-singlereport'
            testID={'address-singlereport'}
            style={styles.address}>{this.marker.address == null ? 'Indirizzo sconosciuto' : this.marker.address}, {this.date + ' alle ' + this.time}</Text>
        </View>
        <ScrollView style={styles.scrollable}>
          <View>
            <Image style={styles.image} source={this.imgUri} />
            {((this.state.voted == null) &&
              <LinearGradient style={styles.voteOverlay} colors={['rgba(255,255,255,0)', 'rgba(0,0,0,0.75)']}>
                <TouchableOpacity accessibilityLabel='vote-up' testID={'vote-up'} style={styles.voteButton}
                  onPress={() => {}}>
                  <Icon name='thumbs-o-up' style={[styles.voteIcon, styles.thumbUp]} />
                </TouchableOpacity>
                <TouchableOpacity accessibilityLabel='vote-down' testID={'vote-down'} style={styles.voteButton}
                  onPress={() => {}}>
                  <Icon name='thumbs-o-down' style={[styles.voteIcon, styles.thumbDown]} />
                </TouchableOpacity>
              </LinearGradient>) ||
              <LinearGradient style={styles.voteOverlay} colors={['rgba(255,255,255,0)', this.state.voted ? 'rgba(0,255,0,0.75)' : 'rgba(255,0,0,0.75)']}>
                <TouchableOpacity accessibilityLabel='vote-up' testID={'vote-up'} style={styles.voteButton}
                  onPress={() => {}}>
                  <Icon name='thumbs-o-up' style={styles.voteIcon} />
                </TouchableOpacity>
                <TouchableOpacity accessibilityLabel='vote-down' testID={'vote-down'} style={styles.voteButton}
                  onPress={() => {}}>
                  <Icon name='thumbs-o-down' style={styles.voteIcon} />
                </TouchableOpacity>
              </LinearGradient>
            }
          </View>

          <View style={styles.innerContainer}>
            <Text accessibilityLabel='description-singlereport'
              testID={'description-singlereport'}
              style={styles.description}>{this.marker.description}</Text>
            <View style={styles.footer} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FEFEFE'
  },
  header: {
    padding: 5
  },
  scrollable: {
    flexDirection: 'column'
  },
  innerContainer: {
    padding: 15
  },
  footer: {
    flex: 0.1
  },
  image: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth
  },
  title: {
    ...Fonts.style.h3,
    borderBottomColor: '#EAEAEA',
    textAlign: 'center',
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomWidth: 1
  },
  address: {
    fontSize: Fonts.size.small,
    textAlign: 'center',
    padding: 5
  },
  row: {
    flexDirection: 'row'
  },
  voteButton: {
    flex: 1,
    alignItems: 'center'

  },
  voteOverlay: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    padding: 5
  },
  voteIcon: {
    fontSize: 40
  },
  thumbUp: {
    color: Colors.voteUp
  },
  thumbDown: {
    color: 'red'
  }
})
