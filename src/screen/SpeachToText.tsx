import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import axios from 'axios';

const SpeachToText = () => {

  const data = () => {
    let url = 'http://3.110.166.60:5010/getvoicedata';

    // Define the data to be sent in the body of the request
    const data = {
      voice_data: "5kg tmater",
    };

    // Make the POST request
    axios.post(url, data)
      .then(response => {
        // Handle the response here
        console.log('Response:', response?.data);
      })
      .catch(error => {
        // Handle errors here
        console.error('Error:', error);
      });
  }

  return (
    <TouchableOpacity onPress={() => data()}  style={{alignSelf: "center", justifyContent: "center", flex: 1, backgroundColor: "blue"}}>
      <Text>SpeachToText</Text>
    </TouchableOpacity>
  )
}

export default SpeachToText

const styles = StyleSheet.create({})