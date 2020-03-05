import React, {useState, useCallback} from "react";
import OrderService from "../../../services/NovaPoshtaService";
import {Grid} from "@material-ui/core";
import {setCity, setWarehouse} from "../../../data/store/autocomplete/autocompleteActions";
import {useDispatch} from "react-redux";
import {CustomAutocomplete} from '../Autocomplete/Autocomplete';
import Typography from "@material-ui/core/Typography";

export const ShippingDetails = ({
                                    classes,
                                    breakPoints
                                }) => {
    const dispatch = useDispatch();
    const [isCityOpen, setIsCityOpen] = useState(false);
    const [isWarehouseOpen, setIsWarehouseOpen] = useState(false);
    const [cityOptions, setCityOptions] = useState([]);
    const [warehouseOptions, setWarehouseOptions] = useState([]);
    const [isCityLoading, setIsCityLoading] = useState(false);
    const [warehouseInput, setWarehouseInput] = useState(0);

    const fetchCities = useCallback(async (inputValue) => {
        return await OrderService.getNovaPoshtaCities(inputValue);
    }, []);

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
            setWarehouseInput(prevState => ++prevState);
        } else {
            dispatch(setCity({city: item.Description, Ref: item.Ref}));
            const response = await OrderService.getNovaPoshtaWarehouses(item.Ref);
            setWarehouseOptions(response.data);
        }
    }, [dispatch]);

    const onWarehouseSelectHandler = useCallback(async (item) => {
        if (!item) {
            dispatch(setWarehouse(null));
        } else {
            dispatch(setWarehouse({warehouse: item.Description, Ref: item.Ref}));
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
                    isOpen={isCityOpen}
                    options={cityOptions}
                    isLoading={isCityLoading}
                    onSelectHandler={onCitySelectHandler}
                    onInputChangedHandler={onCityInputChangedHandler}
                    onToggle={toggleCityAutocomplete}
                    onClose={toggleCityAutocomplete}
                    renderOption={renderCityOptions}
                    inputLabel="Select City"
                    getOptionLabel={getCityOptionLabel}
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
                    isOpen={isWarehouseOpen}
                    options={warehouseOptions}
                    onSelectHandler={onWarehouseSelectHandler}
                    onToggle={toggleWarehouseAutocomplete}
                    onClose={toggleWarehouseAutocomplete}
                    renderOption={renderWarehouseOptions}
                    inputLabel='Select Warehouse'
                    getOptionLabel={getWarehouseOptionLabel}
                    disabled={warehouseOptions.length === 0}
                    key={warehouseInput}
                />
            </Grid>
        </>
    );
};
