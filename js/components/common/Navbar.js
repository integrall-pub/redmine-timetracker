/**
   Copyright 2017 Vilppu Vuorinen

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 * /
/* @flow */
'use strict'

import React from 'react'
import {
  StyleSheet,
  Text,
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
  children?: any,
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
  onPress?: () => void
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
