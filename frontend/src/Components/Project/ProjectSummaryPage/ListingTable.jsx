import React from 'react';
import * as ListingTableComponents from './ListingTableStyle';

const Listing = ({columns}) => {
    return (
        <ListingTableComponents.Container>
            <ListingTableComponents.TableContainer>
                <ListingTableComponents.Table>
                    <thead>
                    <ListingTableComponents.TableRow>
                        {
                            columns.map((column) => (
                                <ListingTableComponents.TableHeader key={column}>
                                    <ListingTableComponents.ColumnTitle>{column}</ListingTableComponents.ColumnTitle>
                                </ListingTableComponents.TableHeader>
                            ))
                        }
                    </ListingTableComponents.TableRow>
                    </thead>
                    <tbody>
                    <ListingTableComponents.TableRow>
                        <ListingTableComponents.TableData>BACKLOG</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Task limit value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Visible on dashboard value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Open tasks value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Closed tasks value</ListingTableComponents.TableData>
                    </ListingTableComponents.TableRow>
                    <ListingTableComponents.TableRow>
                        <ListingTableComponents.TableData>READY FOR DEV/REFACTOR</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Task limit value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Visible on dashboard value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Open tasks value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Closed tasks value</ListingTableComponents.TableData>
                    </ListingTableComponents.TableRow>
                    <ListingTableComponents.TableRow>
                        <ListingTableComponents.TableData>IN PROGRESS</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Task limit value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Visible on dashboard value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Open tasks value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Closed tasks value</ListingTableComponents.TableData>
                    </ListingTableComponents.TableRow>
                    <ListingTableComponents.TableRow>
                        <ListingTableComponents.TableData>IN CODE REVIEW</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Task limit value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Visible on dashboard value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Open tasks value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Closed tasks value</ListingTableComponents.TableData>
                    </ListingTableComponents.TableRow>
                    <ListingTableComponents.TableRow>
                        <ListingTableComponents.TableData>IN PROGRESS</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Task limit value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Visible on dashboard value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Open tasks value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Closed tasks value</ListingTableComponents.TableData>
                    </ListingTableComponents.TableRow>
                    <ListingTableComponents.TableRow>
                        <ListingTableComponents.TableData>IN CODE REVIEW</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Task limit value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Visible on dashboard value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Open tasks value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Closed tasks value</ListingTableComponents.TableData>
                    </ListingTableComponents.TableRow>
                    <ListingTableComponents.TableRow>
                        <ListingTableComponents.TableData>IN PROGRESS</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Task limit value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Visible on dashboard value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Open tasks value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Closed tasks value</ListingTableComponents.TableData>
                    </ListingTableComponents.TableRow>
                    <ListingTableComponents.TableRow>
                        <ListingTableComponents.TableData>IN CODE REVIEW</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Task limit value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Visible on dashboard value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Open tasks value</ListingTableComponents.TableData>
                        <ListingTableComponents.TableData>Closed tasks value</ListingTableComponents.TableData>
                    </ListingTableComponents.TableRow>
                    </tbody>
                </ListingTableComponents.Table>
                <ListingTableComponents.Divider/>
            </ListingTableComponents.TableContainer>
        </ListingTableComponents.Container>
    );
};

export default Listing;
