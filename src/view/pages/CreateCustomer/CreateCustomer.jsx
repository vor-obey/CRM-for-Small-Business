import React, {useCallback, useEffect, useState} from 'react';

import {SaveCustomerForm} from "../../components/SaveCustomerForm/SaveCustomerForm";
import {CustomerService} from "../../../services";
import SourcesService from "../../../services/SourcesService";

const CreateCustomer = (props) => {

    const [customerDetails, setCustomerDetails] = useState({
        username: '',
        name: '',
        contactNumber: '',
        contactEmail: '',
        details: '',
        sourceId: '',
    });
    const [sources, setSources] = useState([]);

    const {history} = props;

    const onChangeHandler = useCallback((event) => {
        const {name, value} = event.target;
        setCustomerDetails(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }, []);

    const onSubmitHandler = useCallback(async (event, details) => {
        event.preventDefault();
        const {sourceId, ...customerDetails} = details;
        console.log(event, customerDetails);
        try {
            await CustomerService.create(customerDetails);
            history.push('/customers');
        } catch (e) {
            console.log(e);
        }
    }, [history]);

    useEffect(() => {
        (async function () {
            try {
                const [sources] = await Promise.all(
                    [
                        SourcesService.list(),
                    ]
                );
                setSources(sources);
            } catch (e) {
                console.log(e);
            }
        })()
    }, []);

    const renderSources = () => {
        if (!sources || !sources.length) {
            return null;
        }

        return sources.map(source => {
            return (
                <option key={source.sourceId} value={source.sourceId}>{source.name}</option>
            );
        })
    };

    return (
        <SaveCustomerForm
            details={customerDetails}
            renderSource={renderSources}
            titleText="Create Customer"
            onSubmit={onSubmitHandler}
            submitText="Add new customer"
            onChange={onChangeHandler}
        />
    )
};

export default CreateCustomer;
