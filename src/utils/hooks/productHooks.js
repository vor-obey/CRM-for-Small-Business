import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    cleanAttributes,
    cleanProductDetails,
    cleanProductTemplateDetails,
    cleanProductTypeDetails,
    getProductDetailsById,
    getProducts,
    getProductsTypes,
    getTemplatesProducts,
    setAttributesToState,
    setProductTypeDetails,
    setTemplateProductDetails
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
    }, [dispatch, productsTypes.length]);

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

            dispatch(getTemplatesProducts())

    }, [abstractProducts.length, dispatch]);

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
    const attributes = useSelector(state => state.productReducer.attributes);

    useEffect(() => {
        if(productTypeId){
            dispatch(setAttributesToState(productTypeId))
        }

        return () => {
            dispatch(cleanAttributes());
        }
    }, [productTypeId, dispatch, triggerCount]);

    return {attributes, triggerAttributesUpdate};
};
