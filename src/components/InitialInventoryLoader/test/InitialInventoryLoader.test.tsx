import React from 'react';
import { mount } from 'enzyme'
import InitialInventoryLoader from '../InitialInventoryLoader';
import { CSVReader } from 'react-papaparse';
import { act } from '@testing-library/react';
import WarehouseTable from '../WarehouseTable';
import InventoryStateParser from '../InventoryStateParser';

const input = [
    { data: ['Cherry Hardwood Arched Door - PS', 'COM-100001', 'WH-A,5|WH-B,10'] },
    { data: ['Maple Dovetail Drawerbox', 'COM-124047', 'WH-A,15'] },
    { data: ['Generic Wire Pull', 'COM-123906c', 'WH-A,10|WH-B,6|WH-C,2'] },
    { data: ['Yankee Hardware 110 Deg. Hinge', 'COM-123908', 'WH-A,10|WH-B,11'] },
    { data: ['Hdw Accuride CB0115-CASSRC - Locking Handle Kit - Black', 'CB0115-CASSRC', 'WH-C,13|WH-B,5'] },
    { data: ['Veneer - Charter Industries - 3M Adhesive Backed - Cherry 10mm - Paper Back', '3M-Cherry-10mm', 'WH-A,10|WH-B,1'] },
    { data: ['Veneer - Cherry Rotary 1 FSC', 'COM-123823', 'WH-C,10'] },
    { data: ['MDF, CARB2, 1 1/8"', 'COM-101734', 'WH-C,8'] }
];

jest.mock('../InventoryStateParser', () => {
    const output = [
        {
            name: 'WH-A', totalCount: 50, materials: [
                { id: '3M-Cherry-10mm', count: 10 },
                { id: 'COM-100001', count: 5 },
                { id: 'COM-123906c', count: 10 },
                { id: 'COM-123908', count: 10 },
                { id: 'COM-124047', count: 15 }
            ]
        },
        {
            name: 'WH-C', totalCount: 33, materials: [
                { id: 'CB0115-CASSRC', count: 13 },
                { id: 'COM-101734', count: 8 },
                { id: 'COM-123823', count: 10 },
                { id: 'COM-123906c', count: 2 }
            ]
        },
        {
            name: 'WH-B', totalCount: 33, materials: [
                { id: '3M-Cherry-10mm', count: 1 },
                { id: 'CB0115-CASSRC', count: 5 },
                { id: 'COM-100001', count: 10 },
                { id: 'COM-123906c', count: 6 },
                { id: 'COM-123908', count: 11 }
            ]
        }
    ];

    return jest.fn().mockReturnValue(output);
});

describe('InitialInventoryLoader', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('proper parse config', () => {
        const wrapper = mount(<InitialInventoryLoader />);
        expect(wrapper.find(CSVReader).prop('config')).toEqual({
            header: false,
            delimiter: ';',
            comments: '#',
            skipEmptyLines: true
        });
    });

    test('calling parser', async () => {
        const wrapper = mount(<InitialInventoryLoader />);
        wrapper.update();

        act(() => {
            // @ts-ignore 
            wrapper.find<CSVReader>(CSVReader).instance().props.onDrop(input);
        });
        expect(InventoryStateParser).toHaveBeenCalledTimes(1);
        expect(InventoryStateParser).toHaveBeenCalledWith(input);
    });

    test('buiding tables', async () => {
        const wrapper = mount(<InitialInventoryLoader />);

        act(() => {
            // @ts-ignore 
            wrapper.find<CSVReader>(CSVReader).instance().props.onDrop(input);
        });
        wrapper.update();
        expect(wrapper.find(WarehouseTable)).toHaveLength(3);

        const output = [
            {
                name: 'WH-A', totalCount: 50, materials: [
                    { id: '3M-Cherry-10mm', count: 10 },
                    { id: 'COM-100001', count: 5 },
                    { id: 'COM-123906c', count: 10 },
                    { id: 'COM-123908', count: 10 },
                    { id: 'COM-124047', count: 15 }
                ]
            },
            {
                name: 'WH-C', totalCount: 33, materials: [
                    { id: 'CB0115-CASSRC', count: 13 },
                    { id: 'COM-101734', count: 8 },
                    { id: 'COM-123823', count: 10 },
                    { id: 'COM-123906c', count: 2 }
                ]
            },
            {
                name: 'WH-B', totalCount: 33, materials: [
                    { id: '3M-Cherry-10mm', count: 1 },
                    { id: 'CB0115-CASSRC', count: 5 },
                    { id: 'COM-100001', count: 10 },
                    { id: 'COM-123906c', count: 6 },
                    { id: 'COM-123908', count: 11 }
                ]
            }
        ];

        wrapper.find(WarehouseTable).forEach((w, index) => {
            expect(w.props()).toMatchObject({ warehouse: output[index] });
        })
    });
});
