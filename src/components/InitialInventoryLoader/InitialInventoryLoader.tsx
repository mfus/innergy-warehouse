import React, { useState } from 'react';
import WarehouseTable from './WarehouseTable';
import InventoryStateParser from './InventoryStateParser';
import { CSVReader, } from 'react-papaparse'
import { Warehouse } from './warehouse';

function InitialInventoryLoader() {
    const [data, setData] = useState<Warehouse[]>([]);
    const [error, setError] = useState('');

    const showError = (error: string) => {
        setError(`Failed to parse: ${error}`);
    };

    const handleData = (raw: { data: string[] }[]) => {
        setError('');
        const parsed = InventoryStateParser(raw.map(x => x.data));
        setData(parsed);
    };

    const config = {
        header: false,
        delimiter: ";",
        comments: "#",
        skipEmptyLines: true
    }

    return (
        <div>
            <CSVReader
                onDrop={handleData}
                onError={showError}
                config={config}
            >
                <span>Drop file</span>
            </CSVReader>
            <div className='error'>{error}</div>
            {data.map(x => <WarehouseTable key={x.name} warehouse={x} />)}
        </div>
    );
}

export default InitialInventoryLoader;