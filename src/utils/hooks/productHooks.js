import {useEffect, useState} from 'react';
import {setIsLoading, setSnackBarStatus} from '../../data/store/auxiliary/auxiliaryActions';
import {AttributeService} from '../../services';
import {useDispatch, useSelector} from 'react-redux';
import {
    cleanProductDetails, cleanProductTemplateDetails, cleanProductTypeDetails,
    getProductDetailsById,
    getProducts,
    getProductsTypes, getTemplatesProducts, setProductTypeDetails, setTemplateProductDetails
} from "../../data/store/product/productActions";


export const useProductTypes = () => {
    const dispatch = useDispatch();
    const [triggerCount, triggerProductTypesUpdate] = useState(0);
    const productsTypes = useSelector(state => state.productReducer.productsTypes);
    const productsStatus = useSelector( state => state.productReducer.productsStatus);
    useEffect(() => {
        if(productsTypes.length < 1){
            dispatch(getProductsTypes());
        }
    }, [dispatch]);

    return {productsTypes, productsStatus, triggerProductTypesUpdate, triggerCount};
};

export const useProductTypeById = (id) => {
    const dispatch = useDispatch();
    const productType = useSelector(state => state.productReducer.productTypeDetails);
    useEffect(() => {
            dispatch(setProductTypeDetails(id));

            return () => {
                dispatch(cleanProductTypeDetails())
            }

    }, [dispatch, id]);

    return {productType};
};

export const useAbstractProductDetailsById = (id) => {
    const dispatch = useDispatch();
    const abstractProductDetails = useSelector(state => state.productReducer.productTemplateDetails);

    useEffect(() => {
        dispatch(setTemplateProductDetails(id));

        return () => {
            dispatch(cleanProductTemplateDetails());
        }
    }, [dispatch, id]);

    return {abstractProductDetails};
};

export const useAbstractProducts = () => {
    const dispatch = useDispatch();
    const abstractProducts = useSelector(state => state.productReducer.productsTemplates);
    const isLoading = useSelector(state => state.auxiliaryReducer.isLoading);
    useEffect(() => {
        if(abstractProducts.length < 1 ){
            dispatch(getTemplatesProducts())
        }
    }, [dispatch]);

    return {abstractProducts, isLoading};
};

export const useProductDetailsById = (id) => {
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productReducer.productDetails);

    useEffect(() => {
        dispatch(getProductDetailsById(id));

        return () => {
            dispatch(cleanProductDetails())
        }
    }, [dispatch, id]);

    return {productDetails};
};

export const useProductsState = () => {
    const dispatch = useDispatch();
    const { products, productsStatus } = useSelector(state => state.productReducer);

    useEffect(() => {
        if (products.length < 1 && !productsStatus.isSuccess && !productsStatus.isLoading) {
            dispatch(getProducts())
        }
    }, [dispatch, products, productsStatus])

    return { products, productsStatus };
};

export const useAttributesByProductTypeId = (productTypeId) => {
    const dispatch = useDispatch();
    const [triggerCount, triggerAttributesUpdate] = useState(0);
    const [attributes, setAttributes] = useState([]);

    useEffect(() => {
        const fetchAttributesByProductTypeId = async (productTypeId) => {
            try {
                dispatch(setIsLoading(true));
                const response = await AttributeService.findOneById(productTypeId);
                setAttributes(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
            }
        };
        if (productTypeId) {
            fetchAttributesByProductTypeId(productTypeId);
        }
    }, [productTypeId, dispatch, triggerCount]);

    return {attributes, setAttributes, triggerAttributesUpdate};
};
