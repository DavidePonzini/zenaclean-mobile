import React, { Component } from 'react'
import { StyleSheet, View, Image, ScrollView, Alert } from 'react-native'
import { FormInput, FormLabel, FormValidationMessage, Button, Text } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ImagePicker from 'react-native-image-picker'
import api from '../Services/ApiService'

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

const formItems = {
  title: 'Titolo Segnalazione',
  titleErrorMessage: 'Inserisci un titolo per la segnalazione',
  descrErrorMessage: 'Inserisci una descrizione per la segnalazione',
  address: 'Indirizzo',
  descr: 'Descrizione'
}

export default class AddReportScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      photoSource: null,
      lat: this.props.navigation.state.params.lat,
      lng: this.props.navigation.state.params.lng,
      nameFile: 'Aggiungi Foto',
      address: 'Caricamento in corso..',
      titleError: false,
      descrError: false,
      title: '',
      description: ''
    }
  }

  convertAddress = (lat, lng) => {
    return api.getAddressFromCoords({ lat, lng }, (res) => {
      this.setState({ address: res })
    })
  }

  handleTitle = (title) => {
    this.setState({ title: title })
  }

  handleDescr = (descr) => {
    this.setState({ description: descr })
  }

  componentWillMount () {
    return this.convertAddress(this.state.lat, this.state.lng)
  }

  uploadData () {
    const data = {
      description: this.state.description,
      latitude: this.state.lat,
      longitude: this.state.lng,
      timestamp: new Date().toISOString(),
      title: this.state.title
    }
    api.uploadReport(data)
      .then(() => this.showAlert())
  }

  showAlert = () => {
    let that = this
    Alert.alert(
      'Segnalazione riuscita',
      '',
      [
        { text: 'OK', onPress: () => { that.props.navigation.goBack() } }
      ],
      { cancelable: false }
    )
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
    const { goBack } = this.props.navigation
    return (
      <ScrollView style={styles.container_scroll}>
        <View style={styles.container}>
          <FormLabel labelStyle={styles.title_label}>{formItems.title}</FormLabel>
          <FormInput inputStyle={styles.input} value={this.state.title} onChangeText={this.handleTitle} />
          { this.state.titleError && <FormValidationMessage>{formItems.titleErrorMessage}</FormValidationMessage> }

          <FormLabel labelStyle={[styles.title_label, styles.margin_top]}>{formItems.address}</FormLabel>
          <Text style={styles.place}>{this.state.address}</Text>

          <FormLabel labelStyle={[styles.title_label, styles.margin_top]}>{formItems.descr}</FormLabel>
          <FormInput inputStyle={[styles.input, styles.input_desc]} value={this.state.descr} onChangeText={this.handleDescr} multiline />
          { this.state.descrError && <FormValidationMessage>{formItems.descrErrorMessage}</FormValidationMessage> }

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
              onPress={() => { goBack() }}
              title='Annulla' />
            <Button
              raised
              containerViewStyle={{ borderRadius: 10 }}
              iconRight={{ name: 'md-arrow-round-up', type: 'ionicon', color: 'lightgreen', size: 20 }}
              buttonStyle={[styles.form_button, styles.btn_send]}
              disabled={!this.state.title}
              onPress={() => this.uploadData()}
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
    width: wp('100%'),
    height: hp('100%')
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
