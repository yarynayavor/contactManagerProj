import 'react-native';
import React from 'react';
import { shallow,mount } from 'enzyme';
import ContactList from '../screens/ContactList';
import jest from 'jest';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'
import ContactDetails from "../screens/ContactDetails";

describe('Testing app', () => {

    it('renders correctly', () => {
        const tree = renderer.create(
            <ContactList />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

