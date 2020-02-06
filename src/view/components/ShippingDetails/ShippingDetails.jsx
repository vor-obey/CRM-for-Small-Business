import React, {useState, useCallback} from "react";
import OrderService from "../../../services/NovaPoshtaService";
import {Grid} from "@material-ui/core";
import {setCity, setWarehouse} from "../../../data/store/autocomplete/autocompleteActions";
import {useDispatch} from "react-redux";
import {CustomAutocomplete} from '../Autocomplete/Autocomplete';


export const ShippingDetails = (props) => {
   const {breakPoints, classes} = props;
   const dispatch = useDispatch();
   const [isCityOpen, setIsCityOpen] = useState(false);
   const [isWarehouseOpen, setIsWarehouseOpen] = useState(false);
   const [cityOptions, setCityOptions] = useState([]);
   const [warehouseOptions, setWarehouseOptions] = useState([]);
   const [isCityLoading, setIsCityLoading] = useState(false);

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
         dispatch(setCity({}));
         dispatch(setWarehouse({}));
         setWarehouseOptions([]);
         setCityOptions([]);
      } else {
         dispatch(setCity({description: item.Description, ref: item.Ref}));
         const response = await OrderService.getNovaPoshtaWarehouses(item.Ref);
         setWarehouseOptions(response.data);
      }
   }, [dispatch]);

   const onWarehouseSelect = useCallback(async (item) => {
      if (!item) {
         dispatch(setWarehouse({}));
      } else {
         dispatch(setWarehouse({description: item.Description, ref: item.Ref}));
      }
   }, [dispatch]);

   const onCityToggle = useCallback(() => {
      setIsCityOpen(prevState => !prevState);
   }, []);

   const onWarehouseToggle = useCallback(() => {
      setIsWarehouseOpen(prevState => !prevState);
   }, []);

   const onCityClose = useCallback(() => {
      setIsCityOpen(prevState => !prevState);
      setWarehouseOptions([]);
   }, []);

   const onWarehouseClose = useCallback(() => {
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
               onClose={onCityClose}
               options={cityOptions}
               isOpen={isCityOpen}
               isLoading={isCityLoading}
               label='city'
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
               onClose={onWarehouseClose}
               options={warehouseOptions}
               isOpen={isWarehouseOpen}
               label='warehouse'
               disabled={warehouseOptions.length === 0}
            />
         </Grid>
      </>
   );

};
