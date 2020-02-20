import React, {useState, useCallback} from "react";
import OrderService from "../../../services/NovaPoshtaService";
import {Grid} from "@material-ui/core";
import {setCity, setWarehouse} from "../../../data/store/autocomplete/autocompleteActions";
import {useDispatch} from "react-redux";
import {CustomAutocomplete} from '../Autocomplete/Autocomplete';

export const ShippingDetails = (props) => {

   const {
      classes,
      optionKey,
      breakPoints,
      secondaryText
   } = props;

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

   const onCitySelect = useCallback(async item => {
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

   const onWarehouseSelect = useCallback(async (item) => {
      if (!item) {
         dispatch(setWarehouse(null));
      } else {
         dispatch(setWarehouse({warehouse: item.Description, Ref: item.Ref}));
      }
   }, [dispatch]);

   const onCityToggle = useCallback(() => {
      setIsCityOpen(prevState => !prevState);
   }, []);

   const onWarehouseToggle = useCallback(() => {
      setIsWarehouseOpen(prevState => !prevState);
   }, []);

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
               onInputChangedHandler={onCityInputChangedHandler}
               onSelectHandler={onCitySelect}
               onToggle={onCityToggle}
               onClose={onCityToggle}
               options={cityOptions}
               isOpen={isCityOpen}
               isLoading={isCityLoading}
               primaryText="Description"
               inputLabel="Select City"
               optionKey={optionKey}
               secondaryText={secondaryText}
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
               onSelectHandler={onWarehouseSelect}
               onToggle={onWarehouseToggle}
               onClose={onWarehouseToggle}
               options={warehouseOptions}
               isOpen={isWarehouseOpen}
               primaryText="Description"
               inputLabel="Select Warehouse"
               disabled={warehouseOptions.length === 0}
               key={warehouseInput}
               optionKey={optionKey}
               secondaryText={secondaryText}
            />
         </Grid>
      </>
   );
};
