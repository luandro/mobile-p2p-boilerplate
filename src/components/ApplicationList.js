import React, { PureComponent } from 'react'
import {
  Button,
  StyleSheet,
  TextInput,
  Text,
  View,
  AppState,
  FlatList
} from 'react-native'
import ApplicationItem from '../components/ApplicationItem'

export default class ApplicationList extends PureComponent {
  render() {
    const { handleInstall, refetch, refreshing, data, dats, datRefetch } = this.props
    return (
      <FlatList
        data={data}
        keyExtractor={(item, key) => item.name}
        onRefresh={refetch}
        refreshing={refreshing}
        renderItem={item => <ApplicationItem
          {...item.item}
          dats={dats}
          handleInstall={() => handleInstall(item.item.datHash)}
        />}
      />
    );
  }
}
