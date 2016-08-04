/* @flow */
'use strict'

import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

type NavbarProps = {
  active: string,
  onHistory?: () => void,
  onDashboard?: () => void,
  onAdd?: () => void
}
export default function Navbar ({
  active,
  onHistory = () => {},
  onDashboard = () => {},
  onAdd = () => {}
}: NavbarProps) {
  return (
    <View style={styles.container}>
      <NavItem active={active === 'dashboard'} onPress={onDashboard}>Dashboard</NavItem>
      <NavItem active={active === 'history'} onPress={onHistory}>History</NavItem>
      <AddItem />
    </View>
  )
}

type NavItemProps = {
  active: boolean,
  children: any,
  onPress: () => void
}
const NavItem = ({
  active = false,
  children = null,
  onPress = () => {}
}: NavItemProps) => (
  <TouchableHighlight
    activeOpacity={0.5}
    underlayColor='gray'
    style={[styles.navItem, { backgroundColor: active ? 'gray' : 'transparent' }]}
    onPress={onPress}>
    <Text style={styles.navItemText}>{children}</Text>
  </TouchableHighlight>
)

type AddItemProps = {
  onPress: () => void
}
const AddItem = ({
  onPress = () => {}
}: AddItemProps) => (
  <TouchableHighlight
    activeOpacity={0.5}
    underlayColor='gray'
    style={styles.addItem}
    onPress={onPress}>
    <Icon name='plus' size={20} style={{ textAlign: 'center' }} />
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1
  },
  navItem: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 8
  },
  navItemText: {
    textAlign: 'center',
    fontSize: 20
  },
  addItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 8
  }
})
