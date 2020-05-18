import React, {useCallback, useEffect, useReducer, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {CustomAutocomplete} from '../Autocomplete/Autocomplete';
import {NovaPoshtaService} from '../../../services';
import {makeStyles, Typography} from '@material-ui/core';
import {useDebounce} from '../../../utils/hooks/debounceHook';
import {novaPoshtaAddressStyles} from './NovaPoshtaAdress.style';
import isEmpty from 'lodash/isEmpty';

const initialState = {
    cityParams: {
        options: [],
        isOpen: false,
        isLoading: false,
        value: null,
    },
    warehouseParams: {
        options: [],
        isOpen: false,
        isLoading: false,
        value: null,
    }
};

function reducer(state, action) {
    switch (action.type) {
        case 'setCityLoading': {
            return {
                ...state,
                cityParams: {
                    ...state.cityParams,
                    isLoading: action.isLoading,
                }
            };
        }
        case 'setWarehouseLoading': {
            return {
                ...state,
                warehouseParams: {
                    ...state.warehouseParams,
                    isLoading: action.isLoading,
                }
            };
        }
        case 'setCityOptions': {
            return {
                ...state,
                cityParams: {
                    ...state.cityParams,
                    options: action.options
                }
            }
        }
        case 'setWarehouseOptions': {
            return {
                ...state,
                warehouseParams: {
                    ...state.warehouseParams,
                    options: action.options
                }
            }
        }
        case 'setCityValue': {
            return {
                ...state,
                cityParams: {
                    ...state.cityParams,
                    value: action.city
                }
            }
        }
        case 'setWarehouseValue': {
            return {
                ...state,
                warehouseParams: {
                    ...state.warehouseParams,
                    value: action.warehouse
                }
            }
        }
        case 'toggleCityAutocomplete': {
            return {
                ...state,
                cityParams: {
                    ...state.cityParams,
                    isOpen: !state.cityParams.isOpen
                }
            }
        }
        case 'toggleWarehouseAutocomplete': {
            return {
                ...state,
                warehouseParams: {
                    ...state.warehouseParams,
                    isOpen: !state.warehouseParams.isOpen
                }
            }
        }
        default: {
            break;
        }
    }
}

const useStyle = makeStyles(novaPoshtaAddressStyles);

export const NovaPoshtaAddress = ({
                                           label,
                                           address,
                                           breakPoints,
                                           onNovaposhtaAddressSelectHandler
                                       }) => {
    const classes = useStyle();
    const [state, dispatch] = useReducer(reducer, initialState, undefined);
    const [cityInput, setCityInput] = useState('');
    const debouncedCityInput = useDebounce(cityInput, 500);
    const {cityParams, warehouseParams} = state;

    const fetchCities = useCallback(async (value) => {
        try {
            dispatch({type: 'setCityLoading', isLoading: true});
            const results = await NovaPoshtaService.getNovaPoshtaCities(value);
            dispatch({type: 'setCityLoading', isLoading: false});
            dispatch({type: 'setCityOptions', options: results.data});
        } catch (e) {
            dispatch({type: 'setCityLoading', isLoading: false});
        }
    }, []);

    const fetchWarehouses = useCallback(async (ref) => {
        try {
            dispatch({type: 'setWarehouseLoading', isLoading: true});
            const results = await NovaPoshtaService.getNovaPoshtaWarehouses(ref);
            dispatch({type: 'setWarehouseLoading', isLoading: false});
            dispatch({type: 'setWarehouseOptions', options: results.data});
        } catch (e) {
            dispatch({type: 'setWarehouseLoading', isLoading: false});
        }
    }, []);

    useEffect(() => {
        const fetchData = async (address) => {
            const {city, warehouse} = address;
            try {
                dispatch({type: 'setCityValue', city});
                dispatch({type: 'setWarehouseValue', warehouse});
                if (!warehouseParams.options.length) {
                    await fetchWarehouses(city.Ref);
                }
            } catch (e) {
                console.log(e);
            }
        };
        if (address && !isEmpty(address.city) && !isEmpty(address.warehouse)) {
            fetchData(address);
        }
    }, [address, fetchCities, fetchWarehouses, warehouseParams.options.length]);

    useEffect(() => {
        onNovaposhtaAddressSelectHandler({
            city: cityParams.value,
            warehouse: warehouseParams.value
        });
    }, [cityParams.value, warehouseParams.value, onNovaposhtaAddressSelectHandler]);

    useEffect(() => {
        if (debouncedCityInput.length > 3) {
            fetchCities(debouncedCityInput);
        } else {
            dispatch({type: 'setCityOptions', options: []});
        }
    }, [debouncedCityInput, fetchCities]);

    useEffect(() => {
        if (cityParams.value) {
            fetchWarehouses(cityParams.value.Ref);
        } else {
            dispatch({type: 'setWarehouseValue', warehouse: null});
            dispatch({type: 'setWarehouseOptions', options: []});
        }
    }, [cityParams.value, fetchWarehouses]);

    const onCityInputChangeHandler = useCallback(async (value) => {
        setCityInput(value);
    }, []);

    const toggleCityAutocomplete = useCallback(() => {
        dispatch({type: 'toggleCityAutocomplete'});
    }, []);

    const toggleWarehouseAutocomplete = useCallback(() => {
        dispatch({type: 'toggleWarehouseAutocomplete'});
    }, []);

    const getCityOptionLabel = useCallback(city => city.Description, []);

    const getWarehouseOptionLabel = useCallback(warehouse => warehouse.Description, []);

    const formatString = useCallback((string, type) => {
        const descriptionRegExp = /[^0-9АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯЁЃЄІЇҐабвгдежзийклмнопрстуфхцчшщъыьэюяёѓєіїґ]/gi;
        const inputRegExp = /\s/g;
        if (type === 'description') {
            return string.toLowerCase().replace(descriptionRegExp, '');
        } else {
            return string.toLowerCase().replace(inputRegExp, '');
        }
    }, []);

    const filterOptions = useCallback((array, {inputValue}) => {
        if (!array.length) {
            return [];
        }

        const formattedInputValue = formatString(inputValue, 'input');

        return array.filter((item) => {
            const formattedDescriptionUa = formatString(item.Description, 'description');
            const formattedDescriptionRu = formatString(item.DescriptionRu, 'description');
            return formattedDescriptionUa.indexOf(formattedInputValue) !== -1 || formattedDescriptionRu.indexOf(formattedInputValue) !== -1;
        });
    }, [formatString]);

    const renderCityOptions = useCallback((city) => {
        return (
            <Grid container alignItems='center'>
                <Grid item xs>
                 <span>
                    {city.Description}
                 </span>
                    <Typography variant='body2' color='textSecondary'>
                        {city.DescriptionRu}
                    </Typography>
                </Grid>
            </Grid>
        );
    }, []);

    const renderWarehouseOptions = useCallback((warehouse) => {
        return (
            <Grid container alignItems='center'>
                <Grid item xs>
                 <span>
                    {warehouse.Description}
                 </span>
                    <Typography variant='body2' color='textSecondary'>
                        {warehouse.DescriptionRu}
                    </Typography>
                </Grid>
            </Grid>
        );
    }, []);

    const onCitySelectHandler = useCallback(async (city) => {
        if (!city) {
            dispatch({type: 'setCityValue', city: null});
            dispatch({type: 'setCityOptions', options: []});
        } else {
            dispatch({type: 'setWarehouseValue', warehouse: null});
            dispatch({type: 'setCityValue', city});
        }
    }, []);

    const onWarehouseSelectHandler = useCallback(async (warehouse) => {
        if (!warehouse) {
            dispatch({type: 'setWarehouseValue', warehouse: null});
        } else {
            dispatch({type: 'setWarehouseValue', warehouse});
        }
    }, []);

    return (
        <>
            <Grid item
                  xl={breakPoints.xl}
                  lg={breakPoints.lg}
                  sm={breakPoints.sm}
                  xs={breakPoints.xs}
                  className={classes.city}
            >
                <CustomAutocomplete
                    isOpen={cityParams.isOpen}
                    options={cityParams.options}
                    isLoading={cityParams.isLoading}
                    onInputChangedHandler={onCityInputChangeHandler}
                    onToggle={toggleCityAutocomplete}
                    onClose={toggleCityAutocomplete}
                    renderOption={renderCityOptions}
                    inputLabel={label.city}
                    getOptionLabel={getCityOptionLabel}
                    value={cityParams.value}
                    onSelectHandler={onCitySelectHandler}
                    filterOptions={filterOptions}
                />
            </Grid>
            <Grid item
                  xl={breakPoints.xl}
                  lg={breakPoints.lg}
                  sm={breakPoints.sm}
                  xs={breakPoints.xs}
                  className={classes.warehouse}
            >
                    <CustomAutocomplete
                        isOpen={warehouseParams.isOpen}
                        options={warehouseParams.options}
                        onInputChangedHandler={() => {}}
                        isLoading={warehouseParams.isLoading}
                        onToggle={toggleWarehouseAutocomplete}
                        onClose={toggleWarehouseAutocomplete}
                        renderOption={renderWarehouseOptions}
                        inputLabel={label.warehouse}
                        getOptionLabel={getWarehouseOptionLabel}
                        value={warehouseParams.value}
                        onSelectHandler={onWarehouseSelectHandler}
                        disabled={!cityParams.value}
                        filterOptions={filterOptions}
                    />
            </Grid>
        </>
    );
};