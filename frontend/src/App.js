import React, {useEffect} from "react";
import Url from './Utils/Url';
import {useDispatch} from "react-redux";
import {DataSyncer} from "./Store/Slice/DataSyncerSlice";
import Loading from './Utils/Loader'
import {useIsDataSyncerLoading} from "./Store/Selector/Selector";

function App() {
    const dispatch = useDispatch();
    const loading = useIsDataSyncerLoading();

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