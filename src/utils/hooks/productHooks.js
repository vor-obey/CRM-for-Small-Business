import {useEffect, useState} from 'react';
import {setIsLoading, setSnackBarStatus} from '../../data/store/auxiliary/auxiliaryActions';
import {AbstractProductService, AttributeService, ProductService, ProductTypeService} from '../../services';
import {useDispatch} from 'react-redux';

export const useProductTypes = () => {
    const dispatch = useDispatch();
    const [triggerCount, triggerProductTypesUpdate] = useState(0);
    const [loading, setLoading] = useState(false);
    const [productTypes, setProductTypes] = useState([]);

    useEffect(() => {
        const fetchProductTypes = async () => {
            try {
                setLoading(true);
                dispatch(setIsLoading(true));
                const response = await ProductTypeService.list();
                setProductTypes(response);
                dispatch(setIsLoading(false));
                setLoading(false);
            } catch (e) {
                setLoading(false);
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
            }
        };
        fetchProductTypes();
    }, [dispatch, triggerCount]);

    return [productTypes, loading, setProductTypes, triggerProductTypesUpdate];
};

export const useProductTypeById = (id) => {
    const dispatch = useDispatch();
    const [productType, setProductType] = useState({});

    useEffect(() => {
        const fetchProductType = async () => {
            try {
                dispatch(setIsLoading(true));
                dispatch(setIsLoading(true));
                const response = await ProductTypeService.findOneById(id);
                setProductType(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
            }
        };
        fetchProductType();
    }, [dispatch, id]);

    return [productType, setProductType];
};

export const useAbstractProductDetailsById = (id) => {
    const dispatch = useDispatch();
    const [abstractProductDetails, setAbstractProductDetails] = useState({});

    useEffect(() => {
        const fetchAbstractProductDetailsById = async (id) => {
            try {
                dispatch(setIsLoading(true));
                const response = await AbstractProductService.findOneById(id);
                setAbstractProductDetails(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
            }
        };
        fetchAbstractProductDetailsById(id);
    }, [dispatch, id]);

    return [abstractProductDetails, setAbstractProductDetails];
};

export const useAbstractProducts = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [abstractProducts, setAbstractProducts] = useState([]);

    useEffect(() => {
        const fetchAbstractProducts = async () => {
            try {
                setLoading(true);
                dispatch(setIsLoading(true));
                const response = await AbstractProductService.list();
                setAbstractProducts(response);
                dispatch(setIsLoading(false));
                setLoading(false);
            } catch (e) {
                setLoading(false);
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: false, message: e.message, success: false}));
            }
        };
        fetchAbstractProducts();
    }, [dispatch]);

    return [abstractProducts, loading, setAbstractProducts];
};

export const useProductDetailsById = (id) => {
    const dispatch = useDispatch();
    const [productDetails, setProductDetails] = useState({});

    useEffect(() => {
        const fetchProductDetailsById = async (id) => {
            try {
                dispatch(setIsLoading(true));
                const response = await ProductService.findOneById(id);
                setProductDetails(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
            }
        };
        fetchProductDetailsById(id);
    }, [dispatch, id]);

    return [productDetails, setProductDetails];
};

export const useProducts = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                dispatch(setIsLoading(true));
                const response = await ProductService.list();
                setProducts(response);
                dispatch(setIsLoading(false));
                setLoading(false);
            } catch (e) {
                setLoading(false);
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
            }
        };
        fetchProducts();
    }, [dispatch]);

    return [products, loading,  setProducts];
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

    return [attributes, setAttributes, triggerAttributesUpdate];
};
