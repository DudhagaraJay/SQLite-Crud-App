import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {navigate} from '../Utils/utils';
import {openDatabase} from 'react-native-sqlite-storage';
import {useIsFocused} from '@react-navigation/native';
let db = openDatabase({name: 'UserDatabase.db'});

const HomeScreen = () => {
  const isFocused = useIsFocused();

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setUserList(temp);
      });
    });
  };

  // const deleteUser = () => {};
  let deleteUser = id => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  table_user where user_id=?',
        [id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            getData();
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  // onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid User Id');
          }
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={userList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity style={styles.userItem}>
              <Text style={styles.itemText}>{'Name: ' + item.name}</Text>
              <Text style={styles.itemText}>{'Email: ' + item.email}</Text>
              <Text style={styles.itemText}>{'Address: ' + item.address}</Text>
              <View style={styles.belowView}>
                <TouchableOpacity
                  onPress={() => {
                    navigate('EditUser', {
                      data: {
                        name: item.name,
                        email: item.email,
                        address: item.address,
                        id: item.user_id,
                      },
                    });
                  }}>
                  <Image
                    source={require('../image/edie.png')}
                    style={styles.icons}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    deleteUser(item.user_id);
                  }}>
                  <Image
                    source={require('../image/delete.png')}
                    style={styles.icons}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
        style={styles.addNewBtn}
        onPress={() => {
          navigate('AddUser', {});
        }}>
        <Text style={styles.btnText}>Add New User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addNewBtn: {
    backgroundColor: 'purple',
    width: 150,
    height: 50,
    borderRadius: 20,
    position: 'absolute',
    bottom: 30,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  userItem: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
  itemText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  belowView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    height: 50,
  },
  icons: {
    width: 24,
    height: 24,
  },
});
