import React from "react";
import {TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getCitySuggestions} from "../../../data/store/autocomplete/autocompleteThunkAction";
import {setInputCity} from "../../../data/store/autocomplete/autocompleteActions";

export const Autocomplete = (props) => {
    const dispatch = useDispatch();
    const citySuggestions = useSelector(state => state.autocompleteReducer.citySuggestions);
    const warehouseSuggestions = useSelector(state => state.autocompleteReducer.warehouseSuggestions);
    const city = useSelector(state => state.autocompleteReducer.inputCityValue);
    const warehouse = useSelector(state => state.autocompleteReducer.inputWarehouseValue);

    const onCityChangedHandler = async (event) => {
        const {value} = event.target;
        dispatch(setInputCity(value));
        if (!value.length) {
            dispatch(setInputCity(''));
            dispatch(getCitySuggestions(value));
        }
        if (value.length >= 1) {
            dispatch(getCitySuggestions(value));
            console.log(city, 'worked');
        }
    };

    const displaySuggestions = suggestions => {
        return suggestions.map((suggestion) =>
            (<div key={suggestion.CityID}>{suggestion.Description}</div>)
        )
    };

    return (
        <React.Fragment>
            <TextField
                label={props.entity === 'City' ? 'City' : 'Warehouse'}
                name={props.entity === 'City' ? 'City' : 'Warehouse'}
                variant={"outlined"}
                type={"text"}
                value={props.entity === 'City' ? city : warehouse}
                onChange={onCityChangedHandler}
            />
            <div>
                {props.entity === 'City' ? displaySuggestions(citySuggestions) : displaySuggestions(warehouseSuggestions)}
            </div>
        </React.Fragment>
    );
};