import React, {useCallback, useEffect, useReducer, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {CustomAutocomplete} from '../Autocomplete/Autocomplete';
import {NovaPoshtaService} from '../../../services';
import {Typography} from '@material-ui/core';

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

export const NovaPoshtaAdressReact = () => {
    const [state, dispatch] = useReducer(reducer, initialState, undefined);
    const [cityInput, setCityInput] = useState('');
    const {cityParams, warehouseParams} = state;

    useEffect(() => {
        const fetchCities = async (value) => {
            dispatch({type: 'setCityLoading', isLoading: true});
            const results = await NovaPoshtaService.getNovaPoshtaCities(value);
            dispatch({type: 'setCityLoading', isLoading: false});
            dispatch({type: 'setCityOptions', options: results.data});
        };
        if (cityInput.length > 3) {
            fetchCities(cityInput);
        } else {
            dispatch({type: 'setCityOptions', options: []});
        }
    }, [cityInput]);

    useEffect(() => {
        const fetchWarehousesByCityRef = async (ref) => {
            dispatch({type: 'setWarehouseLoading', isLoading: true});
            const results = await NovaPoshtaService.getNovaPoshtaWarehouses(ref);
            dispatch({type: 'setWarehouseLoading', isLoading: false});
            dispatch({type: 'setWarehouseOptions', options: results.data});
        };
        if (cityParams.value) {
            fetchWarehousesByCityRef(cityParams.value.Ref);
        } else {
            dispatch({type: 'setWarehouseValue', warehouse: null});
            dispatch({type: 'setWarehouseOptions', options: []});
        }
    }, [cityParams.value]);

    const onCityInputChangeHandler = useCallback(async (value) => {
        setCityInput(value);
    }, []);

    const toggleCityAutocomplete = useCallback(() => {
        dispatch({type: 'toggleCityAutocomplete'});
    }, []);

    const toggleWarehouseAutocomplete = useCallback(() => {
        dispatch({type: 'toggleWarehouseAutocomplete'});
    }, []);

    const getCityOptionLabel = useCallback(city => typeof city === 'string' ? city : city.Description, []);

    const getWarehouseOptionLabel = useCallback(warehouse => typeof warehouse === 'string' ? warehouse : warehouse.Description, []);

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
        console.log(city);
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
        <Grid container style={{
            flexDirection: 'column',
            textAlign: 'center'
        }}>
            <Grid item style={{
                width: '50%',
                margin: '30px auto 30px auto'
            }}>
                <CustomAutocomplete
                    isOpen={cityParams.isOpen}
                    options={cityParams.options}
                    isLoading={cityParams.isLoading}
                    onInputChangedHandler={onCityInputChangeHandler}
                    onToggle={toggleCityAutocomplete}
                    onClose={toggleCityAutocomplete}
                    renderOption={renderCityOptions}
                    inputLabel='City'
                    getOptionLabel={getCityOptionLabel}
                    value={cityParams.value}
                    onSelectHandler={onCitySelectHandler}
                />
            </Grid>
            <Grid item style={{
                width: '50%',
                margin: '30px auto 30px auto'
            }}>
                {warehouseParams.isLoading ? (
                    // todo сделать нормальный индикатор загрузки
                    <div>loading</div>
                ) : (
                    <CustomAutocomplete
                        isOpen={warehouseParams.isOpen}
                        options={warehouseParams.options}
                        onInputChangedHandler={() => {
                        }}
                        onToggle={toggleWarehouseAutocomplete}
                        onClose={toggleWarehouseAutocomplete}
                        renderOption={renderWarehouseOptions}
                        inputLabel='Warehouse'
                        getOptionLabel={getWarehouseOptionLabel}
                        value={warehouseParams.value}
                        onSelectHandler={onWarehouseSelectHandler}
                    />
                )}
            </Grid>
        </Grid>
    );
};