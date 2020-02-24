import React, {useCallback, useState} from 'react';
import {FilterInput} from "../FilterInput/FilterInput";


export const FilterUser = (props) => {


    const onChangeHandler = (e) => {
        this.setState({
            inputFilter: e.target.value,
        })
    };

    return (
        <FilterInput
            label="Search"
            onChange={onChangeHandler}
        />
    )
};