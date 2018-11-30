import React, { Component } from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import { FormInput, FormLabel, FormValidationMessage, Button, Text } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc, removeOrientationListener as rol } from 'react-native-responsive-screen'
import ImagePicker from 'react-native-image-picker'

const options = {
  title: 'Carica foto',
  takePhotoButtonTitle: 'Scatta foto',
  chooseFromLibraryButtonTitle: 'Scegli foto da galleria',
  cancelButtonTitle: 'Annulla',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

export default class AddReportScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      photoSource: null,
      lat: this.props.navigation.state.params.lat,
      long: this.props.navigation.state.params.long,
      nameFile: 'Aggiungi Foto',
      address: 'Caricamento in corso..'
    }
  }

  convertAddress = (lat, long) => {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + long + '&key= AIzaSyB8BtVSZekNUxDxYIOksUoxhGkHx8i0iR8')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson))
        this.setState({
          address: JSON.stringify(responseJson)
        })
      })
  }

  componentDidMount () {
    loc(this)
    //this.convertAddress(this.state.lat, this.state.long)
  }
  componentWillUnmount () {
    rol()
  }

  imageUpload () {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        // const source = { uri: response.uri };

        // You can also display the image using data:
        const source = { uri: 'data:image/jpeg;base64,' + response.data }

        this.setState({
          photoSource: source,
          nameFile: response.fileName
        })

        console.log(this.state.photoSource)
      }
    })
  }

  render () {
    return (
      <ScrollView style={styles.container_scroll}>
        <View style={styles.container}>
          <FormLabel labelStyle={styles.title_label}>Titolo Segnalazione</FormLabel>
          <FormInput inputStyle={styles.input} />
          <FormValidationMessage>Errore messaggio Segnalazione</FormValidationMessage>

          <FormLabel labelStyle={[styles.title_label, styles.margin_top]}>Indirizzo</FormLabel>
          <Text style={styles.place}>{this.state.address}</Text>

          <FormLabel labelStyle={[styles.title_label, styles.margin_top]}>Descrizione</FormLabel>
          <FormInput inputStyle={[styles.input, styles.input_desc]} multiline />
          <FormValidationMessage>Errore messaggio Descrizione</FormValidationMessage>

          <View style={[styles.view_button, styles.margin_top]}>
            <ScrollView horizontal style={{ maxWidth: wp('60%') }}>
              <FormLabel labelStyle={styles.title_label}>{this.state.nameFile}</FormLabel>
            </ScrollView>
            <Button onPress={() => this.imageUpload()} containerViewStyle={{ borderRadius: 40 }} raised buttonStyle={styles.btn_foto} title='+' />
          </View>
          <Image source={this.state.photoSource} />
          <View style={styles.view_button}>
            <Button
              raised
              containerViewStyle={{ borderRadius: 10 }}
              iconRight={{ name: 'ios-close', type: 'ionicon', color: '#FFFFFF', size: 25 }}
              buttonStyle={[styles.form_button, styles.btn_cancel]}
              title='Annulla' />
            <Button
              raised
              containerViewStyle={{ borderRadius: 10 }}
              iconRight={{ name: 'md-arrow-round-up', type: 'ionicon', color: 'lightgreen', size: 20 }}
              buttonStyle={[styles.form_button, styles.btn_send]}
              title='Invia' />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container_scroll: {
    flex: 1,
    width: wp('100%')
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  title_label: {
    fontSize: 25,
    marginBottom: wp('5%'),
    maxWidth: wp('80%')
  },
  place: {
    fontSize: 20
  },
  input: {
    width: wp('80%')
  },
  input_desc: {
    maxHeight: hp('15%')
  },
  margin_top: {
    marginTop: wp('10%')
  },
  view_button: {
    flexDirection: 'row',
    marginTop: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  form_button: {
    width: wp('35%'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn_cancel: {
    backgroundColor: '#D32F2F'
  },
  btn_send: {
    backgroundColor: 'green'
  },
  btn_foto: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: 40,
    backgroundColor: '#BDBDBD'
  }

})
