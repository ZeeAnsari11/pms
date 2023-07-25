import React, {useEffect} from "react";
import Url from './Utils/Url';
import {useDispatch, useSelector} from "react-redux";
import {DataSyncer} from "./Store/Slice/DataSyncerSlice";
import Loading from './Utils/Loader'

function App() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.DataSyncer.loading);

    useEffect(() => {
        dispatch(DataSyncer());
    }, []);
    if (loading) {
        return (<Loading/>);
    }
    return (
        <Url/>
    );
}

export default App;