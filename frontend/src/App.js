import React, {useEffect} from "react";
import Url from './Utils/Url';
import {useDispatch} from "react-redux";
import Loading from './Utils/Loader'
import {useIsDataSyncerLoading} from "./Store/Selector/Selector";
import {useParams} from 'react-router-dom';

function App() {
    const dispatch = useDispatch();
    const loading = useIsDataSyncerLoading();
    const {state, code} = useParams();

    useEffect(() => {
        console.log('State: ' + state);
        console.log('Code: ' + code);

        if (state && code) {
            try {
                // dispatch(googleAuthenticate({state, code}));
            } catch (error) {
                // Handle error if needed
            }
        }
    }, [dispatch]);

    useEffect(() => {
        // dispatch(DataSyncer());
    }, []);
    if (loading) {
        return (<Loading/>);
    }
    return (
        <Url/>
    );
}

export default App;