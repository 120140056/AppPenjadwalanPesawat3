import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, TextInput, Button, FlatList, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from "react-redux";
import store from "./store";
import { addRow, updateRow, deleteRow } from "./actions";

function Main({ navigation }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.title}>Hiling.id</Text>
        <Text style={styles.ch3}>Lokasi Keberangkatan</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('./assets/n-origin.png')}
            style={{ width: 30, height: 30 }}
            resizeMode='contain'
          />
          <TextInput
            style={styles.input}
            value={origin}
            onChangeText={text => setOrigin(text)}
            placeholder="Masukan lokasi keberangkatan"
          />
        </View>
        <Text style={styles.ch3}>Lokasi Tujuan</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('./assets/n-destination.png')}
            style={{ width: 30, height: 30 }}
            resizeMode='contain'
          />
          <TextInput
            style={styles.input}
            value={destination}
            onChangeText={text => setDestination(text)}
            placeholder="Masukan lokasi tujuan"
          />
        </View>
        <Text style={styles.ch3}>Tanggal Keberangkatan</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('./assets/n-date.png')}
            style={{ width: 30, height: 30 }}
            resizeMode='contain'
          />
          <TextInput
            style={styles.input}
            value={departureDate}
            onChangeText={text => setDepartureDate(text)}
            placeholder="Masukan tanggal keberangkatan (yyyy-mm-dd)"
          />
        </View>
        <Button
          title="Cari"
          onPress={() => {
            const filteredRows = rows.filter(row => row.asal === origin && row.tujuan === destination && row.tanggal === departureDate);
            navigation.navigate('SearchResult', { rows: filteredRows});
          }}
        />
      </View>
      <Text style={styles.footer}>Copyright Christian-120140056</Text>
    </View>
  );
}

function Result({ route }) {
  const { rows } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.ch1}>{item.asal}{'\t'}-{'\t'}{item.tujuan}</Text>
      <View style={styles.item2}>
        <View style={styles.item3}>
          <Image
            source={require('./assets/n-plane.png')}
            style={{ width: 30, height: 30 }}
            resizeMode='contain'
          />
          <Text style={styles.ch2}>  {item.merk}</Text>
        </View>
        <Text>{item.tanggal}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rows}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{height: 45}}>
        <Text style={styles.footer}>Copyright Christian-120140056</Text>
      </View>
    </View>
  );
}

function List({ route, navigation }) {
  const { rows } = route.params;
  const handleDelete = () => {
    const rowToDelete = { asal: origin, tujuan: destination, tanggal: departureDate, merk: plane };
    store.dispatch(deleteRow(rowToDelete));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.ch1}>{item.asal}{'\t'}-{'\t'}{item.tujuan}</Text>
      <View style={styles.item2}>
        <View style={styles.item3}>
          <Image
            source={require('./assets/n-plane.png')}
            style={{ width: 30, height: 30 }}
            resizeMode='contain'
          />
          <Text style={styles.ch2}>  {item.merk}</Text>
        </View>
        <Text>{item.tanggal}</Text>
      </View>
      <View style={styles.item4}>
        <TouchableOpacity onPress={() => {
            let index = 0;
            for (let i = 0; i < rows.length; i++) {
              if(rows[i].asal == item.asal && rows[i].tujuan == item.tujuan && rows[i].tanggal == item.tanggal && rows[i].merk == item.merk) {
                index = i;
                break;
              }
            }
            navigation.navigate('EditList', { rows, index })
          }}>
          <Image source={require('./assets/n-edit.png')} style={{ width: 20, height: 20, right: 10 }}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <Image source={require('./assets/n-trash.png')} style={{ width: 20, height: 20, right: 0 }}/>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rows}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{height: 45}}>
        <Text style={styles.footer}>Copyright Christian-120140056</Text>
      </View>
    </View>
  );
}

function Form({ route, navigation }) {
  const { rows } = route.params;
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [plane, setPlane] = useState('');

  const handleAdd = () => {
    const newRow = { asal: origin, tujuan: destination, tanggal: departureDate, merk: plane };
    store.dispatch(addRow(newRow));
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.ch3}>Lokasi Keberangkatan</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('./assets/n-origin.png')}
            style={{ width: 30, height: 30 }}
            resizeMode='contain'
          />
          <TextInput
            style={styles.input}
            value={origin}
            onChangeText={text => setOrigin(text)}
            placeholder="Masukan lokasi keberangkatan"
          />
        </View>
        <Text style={styles.ch3}>Lokasi Tujuan</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('./assets/n-destination.png')}
            style={{ width: 30, height: 30 }}
            resizeMode='contain'
          />
          <TextInput
            style={styles.input}
            value={destination}
            onChangeText={text => setDestination(text)}
            placeholder="Masukan lokasi tujuan"
          />
        </View>
        <Text style={styles.ch3}>Tanggal Keberangkatan</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('./assets/n-date.png')}
            style={{ width: 30, height: 30 }}
            resizeMode='contain'
          />
          <TextInput
            style={styles.input}
            value={departureDate}
            onChangeText={text => setDepartureDate(text)}
            placeholder="Masukan tanggal keberangkatan (yyyy-mm-dd)"
          />
        </View>
        <Text style={styles.ch3}>Maskapai</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('./assets/n-plane.png')}
            style={{ width: 30, height: 30 }}
            resizeMode='contain'
          />
          <TextInput
            style={styles.input}
            value={plane}
            onChangeText={text => setPlane(text)}
            placeholder="Masukan nama maskapai"
          />
        </View>
        <Button
          title="Simpan"
          onPress={handleAdd}
        />
      </View>
      <Text style={styles.footer}>Copyright Christian-120140056</Text>
    </View>
  )
}

function Form2({ route, navigation }) {
  const { rows } = route.params;
  const { index } = route.params;
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [plane, setPlane] = useState('');

  const handleUpdate = () => {
    const updatedRow = { asal: origin, tujuan: destination, tanggal: departureDate, merk: plane };
    store.dispatch(updateRow(updatedRow));
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.ch3}>Lokasi Keberangkatan</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('./assets/n-origin.png')}
            style={{ width: 30, height: 30 }}
            resizeMode='contain'
          />
          <TextInput
            style={styles.input}
            value={origin}
            onChangeText={text => setOrigin(text)}
            placeholder={rows[index].asal}
          />
        </View>
        <Text style={styles.ch3}>Lokasi Tujuan</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('./assets/n-destination.png')}
            style={{ width: 30, height: 30 }}
            resizeMode='contain'
          />
          <TextInput
            style={styles.input}
            value={destination}
            onChangeText={text => setDestination(text)}
            placeholder={rows[index].tujuan}
          />
        </View>
        <Text style={styles.ch3}>Tanggal Keberangkatan</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('./assets/n-date.png')}
            style={{ width: 30, height: 30 }}
            resizeMode='contain'
          />
          <TextInput
            style={styles.input}
            value={departureDate}
            onChangeText={text => setDepartureDate(text)}
            placeholder={rows[index].tanggal}
          />
        </View>
        <Text style={styles.ch3}>Maskapai</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('./assets/n-plane.png')}
            style={{ width: 30, height: 30 }}
            resizeMode='contain'
          />
          <TextInput
            style={styles.input}
            value={plane}
            onChangeText={text => setPlane(text)}
            placeholder={rows[index].merk}
          />
        </View>
        <Button
          title="Simpan"
          onPress={handleUpdate}
        />
      </View>
      <Text style={styles.footer}>Copyright Christian-120140056</Text>
    </View>
  )
}

function info() {
  alert('coming soon!')
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SearchMenu"
            component={Main}
            options={({ navigation }) => ({
              headerStyle: {
                backgroundColor: '#5ced73',
              },
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('RowsList', { rows })}>
                  <Image source={require('./assets/n-list.png')} style={{ width: 50, height: 50, right: 10 }}/>
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={info}>
                  <Image source={require('./assets/n-menu.png')} style={{ width: 35, height: 50, left: 10}}/>
                </TouchableOpacity>
              ),
              title: ''
            })}
          />
          <Stack.Screen
            name="SearchResult"
            component={Result}
            options={{
              headerStyle: {
                backgroundColor: '#5ced73',
              },
              headerRight: () => (
                <TouchableOpacity onPress={info}>
                  <Image source={require('./assets/n-user.png')} style={{ width: 50, height: 50, right: 10}}/>
                </TouchableOpacity>
              ),
              title: 'Hiling.id'
            }}
          />
          <Stack.Screen
            name="RowsList"
            component={List}
            options={({ navigation }) => ({
              headerStyle: {
                backgroundColor: '#5ced73',
              },
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('AddList', { rows })}>
                  <Image source={require('./assets/n-add.png')} style={{ width: 50, height: 50, right: 10}}/>
                </TouchableOpacity>
              ),
              title: 'Hiling.id'
            })}
          />
          <Stack.Screen
            name="AddList"
            component={Form}
            options={{
              headerStyle: {
                backgroundColor: '#5ced73',
              },
              title: 'Add Flight'
            }}
          />
          <Stack.Screen
            name="EditList"
            component={Form2}
            options={{
              headerStyle: {
                backgroundColor: '#5ced73',
              },
              title: 'Edit Flight'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#5ced73',
  },
  container2: {
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 20,
  },
  title: {
    fontSize: 75,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    flex: 1,
    borderRadius: 8,
  },
  item: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 15,
    marginBottom: 10,
  },
  item2: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  item3: { 
    flexDirection: 'row', 
    alignItems: 'center',
  },
  item4: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  ch1: {
    fontWeight: 'bold',
    fontSize: 50,
    flex: 1,
    textAlign: 'center',
  },
  ch2: {
    color: '#666',
    textAlign: 'center',
  },
  ch3: {
    color: '#666',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  footer: {
    padding: 10,
    textAlign: 'center',
    bottom: 0,
    left: 5,
    right: 5,
    position: 'absolute',
    color: '#000',
    marginTop: 15,
  }
});