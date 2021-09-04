import React from 'react';
import { Accordion as NBAccordion, Container, Content, Icon, Text, View } from 'native-base';

import { ContactList } from '../ContactList';

import styles from '../../../styles';

export interface AccordionProps {
  navigation: any;
}

export interface AccordionState {}

export class Accordion extends React.Component<AccordionProps, AccordionState> {
  sections = [];

  constructor(props: AccordionProps) {
    super(props);

    this.sections = [
      {
        title: 'My Contacts',
        content: () => <ContactList />,
      },
      /* {
        title: 'Manage Groups',
        content: () => <ContactList />,
      }, */
    ];
  }

  renderHeader = (item: any, expanded: boolean) => {
    return (
      <View
        padder
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text>{item.title}</Text>
        {expanded ? <Icon name="caret-up-outline" /> : <Icon name="caret-down-outline" />}
      </View>
    );
  };

  renderContent = (item: any) => {
    const { props } = this;
    return <View padder>{item.content(props)}</View>;
  };

  // <Icon name="ios-arrow-back" />
  render() {
    // TODO: Fix this!
    const param = {
      name: {
        item: 'Accordion',
      },
    }; // this.props.navigation.state.params;
    return (
      <NBAccordion dataArray={this.sections} renderHeader={this.renderHeader} renderContent={this.renderContent} />
    );
  }
}

export interface AccordionProps {
  navigation: any;
}

export interface AccordionState {}

export default class AccordionContainer extends React.Component<
  AccordionProps,
  AccordionState
> {
  render() {
    return <Accordion navigation={this.props.navigation} />;
  }
}
