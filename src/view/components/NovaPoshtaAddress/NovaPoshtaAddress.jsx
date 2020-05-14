import React, {useState, useCallback, useEffect} from "react";
import NovaPoshtaService from "../../../services/NovaPoshtaService";
import {Grid, Typography, makeStyles} from "@material-ui/core";
import {setCity, setWarehouse} from "../../../data/store/autocomplete/autocompleteActions";
import {useDispatch} from "react-redux";
import {CustomAutocomplete} from '../Autocomplete/Autocomplete';
import isEmpty from 'lodash/isEmpty';
import {novaPoshtaAddressStyles} from "./NovaPoshtaAdress.style";

const useStyle = makeStyles(novaPoshtaAddressStyles);

export const NovaPoshtaAddress = ({
                                      label,
                                      address,
                                      breakPoints,
                                  }) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [isCityOpen, setIsCityOpen] = useState(false);
    const [isWarehouseOpen, setIsWarehouseOpen] = useState(false);
    const [cityOptions, setCityOptions] = useState([]);
    const [warehouseOptions, setWarehouseOptions] = useState([]);
    const [isCityLoading, setIsCityLoading] = useState(false);
    const [warehouseReset, setWarehouseReset] = useState(0);
    const [cityInput, setCityInput] = useState({
        Description: ''
    });
    const [warehouseInput, setWarehouseInput] = useState({
        Description: ''
    });

    const fetchCities = useCallback(async (inputValue) => {
        return await NovaPoshtaService.getNovaPoshtaCities(inputValue);
    }, []);

    const fetchWarehouses = useCallback(async (ref) => {
        return await NovaPoshtaService.getNovaPoshtaWarehouses(ref);
    }, []);

    useEffect(() => {
        const fetchData = async (address) => {
            const {city, warehouse} = address;
            if (city && warehouse) {
                const citiesResponse = await fetchCities(city.DescriptionRu);
                setCityOptions(citiesResponse.data);
                setCityInput(city);
                dispatch(setCity(city));
                const warehousesResponse = await fetchWarehouses(city.Ref);
                setWarehouseOptions(warehousesResponse.data);
                setWarehouseInput(warehouse);
                dispatch(setWarehouse(warehouse));
            }
        };
        if (!isEmpty(address)) {
            fetchData(address);
        }
    }, [address, fetchCities, fetchWarehouses, dispatch]);

    const onCityInputChangedHandler = useCallback(async event => {
        const {value} = event.target;
        if (value.length < 3) {
            setIsCityLoading(false);
            setCityOptions([]);
            setWarehouseOptions([]);
        } else {
            setIsCityLoading(true);
            const response = await fetchCities(value);
            setCityOptions(response.data);
            setIsCityLoading(false);
        }
    }, [fetchCities]);

    const onCitySelectHandler = useCallback(async item => {
        if (!item) {
            dispatch(setCity(null));
            dispatch(setWarehouse({}));
            setWarehouseOptions([]);
            setCityOptions([]);
            setCityInput({
                Description: ''
            });
            setWarehouseInput({
                Description: ''
            });
            setWarehouseReset(prevState => ++prevState);
        } else {
            dispatch(setCity(item));
            setCityInput(item);
            const response = await NovaPoshtaService.getNovaPoshtaWarehouses(item.Ref);
            setWarehouseOptions(response.data);
        }
    }, [dispatch]);

    const onWarehouseSelectHandler = useCallback(async (item) => {
        if (!item) {
            dispatch(setWarehouse(null));
            setWarehouseInput({
                Description: ''
            });
        } else {
            dispatch(setWarehouse(item));
            setWarehouseInput(item);
        }
    }, [dispatch]);

    const toggleCityAutocomplete = useCallback(() => {
        setIsCityOpen(prevState => !prevState);
    }, []);

    const toggleWarehouseAutocomplete = useCallback(() => {
        setIsWarehouseOpen(prevState => !prevState);
    }, []);

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
                 <span key={warehouse.Ref}>
                    {warehouse.Description}
                 </span>
                    <Typography variant='body2' color='textSecondary'>
                        {warehouse.DescriptionRu}
                    </Typography>
                </Grid>
            </Grid>
        );
    }, []);

    const getCityOptionLabel = useCallback(city => city.Description, []);

    const getWarehouseOptionLabel = useCallback(warehouse => warehouse.Description, []);

    return (
        <>
            <Grid
                item
                xl={breakPoints.xl}
                lg={breakPoints.lg}
                sm={breakPoints.sm}
                xs={breakPoints.xs}
                className={classes.city}>
                <CustomAutocomplete
                    classes={{
                        popper: classes.popper
                    }}
                    isOpen={isCityOpen}
                    options={cityOptions}
                    isLoading={isCityLoading}
                    onSelectHandler={onCitySelectHandler}
                    onInputChangedHandler={onCityInputChangedHandler}
                    onToggle={toggleCityAutocomplete}
                    onClose={toggleCityAutocomplete}
                    renderOption={renderCityOptions}
                    inputLabel={label.city}
                    getOptionLabel={getCityOptionLabel}
                    value={cityInput}
                />
            </Grid>
            <Grid
                item
                xl={breakPoints.xl}
                lg={breakPoints.lg}
                sm={breakPoints.sm}
                xs={breakPoints.xs}
                className={classes.warehouse}>
                <CustomAutocomplete
                    classes={{
                        popper: classes.popper
                    }}
                    isOpen={isWarehouseOpen}
                    options={warehouseOptions}
                    onSelectHandler={onWarehouseSelectHandler}
                    onToggle={toggleWarehouseAutocomplete}
                    onClose={toggleWarehouseAutocomplete}
                    renderOption={renderWarehouseOptions}
                    inputLabel={label.warehouse}
                    getOptionLabel={getWarehouseOptionLabel}
                    disabled={warehouseOptions.length === 0}
                    key={warehouseReset}
                    value={warehouseInput}
                />
            </Grid>
        </>
    );
};
