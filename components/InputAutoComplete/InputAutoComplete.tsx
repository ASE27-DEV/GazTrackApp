import React from 'react';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { styles } from './InputAutoComplete.style'
import { GOOGLE_API_KEY } from '../../environments';
import { Text } from 'react-native';

type InputAutoCompleteProps = {
    label: string;
    placeholder: string;
    onPlaceSelected: (details: GooglePlaceDetail | null) => void;
};

function InputAutoComplete({
    label,
    placeholder,
    onPlaceSelected,
}: InputAutoCompleteProps) {
    return (
        <>
            <Text>{label}</Text>
            <GooglePlacesAutocomplete
                styles={{ textInput: styles.input }}
                placeholder={ placeholder || "" }
                fetchDetails
                onPress={(data, details = null) => {
                    onPlaceSelected(details);
                }}
                query={{
                    key: GOOGLE_API_KEY ,
                    language: 'en',
                }}
            />
        </>
    )
}

export default InputAutoComplete;