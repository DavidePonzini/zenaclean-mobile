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
  title: 'Titolo',
  titleErrorMessage: 'Inserisci un titolo per la segnalazione',
  descrErrorMessage: 'Inserisci una descrizione per la segnalazione',
  address: 'Indirizzo',
  descr: 'Descrizione'
}

export default class AddReportScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Segnalazione'
    }
  }
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
    api.getAddressFromCoords({ lat, lng }, (res) => {
      /* in theory we should get an address and plug it into the dom */
    })
  }

  getData = () => {
    let day = new Date().getDate()
    let month = new Date().getMonth() + 1
    let year = new Date().getFullYear()
    let hour = new Date().getHours()
    let min = new Date().getMinutes()
    let sec = new Date().getSeconds()
    return { currentDate: year + '-' + month + '-' + day + 'T' + hour + ':' + min + ':' + sec }
  }

  handleTitle = (title) => {
    this.setState({ title: title })
  }

  handleDescr = (descr) => {
    this.setState({ description: descr })
  }

  componentDidMount () {
    this.convertAddress(this.state.lat, this.state.lng)
  }

  uploadData () {
    const data = {
      description: this.state.description,
      latitude: this.state.lat,
      longitude: this.state.lng,
      timestamp: this.getData(),
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
            <Button onPress={() => this.imageUpload()} containerViewStyle={{ borderRadius: 40 }} buttonStyle={styles.btn_foto} title='+' />
          </View>
          <Image source={this.state.photoSource} />
          <View style={styles.view_button}>
            <Button
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
    backgroundColor: '#F5FCFF'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center'
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
    width: wp('90%'),
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d6d7da',
    fontSize: 20
  },
  input_desc: {
    maxHeight: hp('10%')
  },
  margin_top: {
    marginTop: wp('5%')
  },
  view_button: {
    flexDirection: 'row',
    marginTop: wp('15%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  form_button: {
    width: wp('80%'),
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
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
