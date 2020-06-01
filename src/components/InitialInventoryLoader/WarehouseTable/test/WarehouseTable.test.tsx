import React from "react";
import WarehouseTable from "../WarehouseTable";
import { shallow } from 'enzyme'

describe("WarehouseTable", () => {

    describe("check rows", () => {

        test("empty", () => {
            const input = {
                name: 'WH-A', totalCount: 50, materials: []
            };

            const wrapper = shallow(<WarehouseTable warehouse={input} />);
            const rows = wrapper.find('tbody > tr');
            expect(rows).toHaveLength(0);
        });

        test("with data", () => {
            const input = {
                name: 'WH-A', totalCount: 50, materials: [
                    { id: 'COM-100001', count: 5 },
                    { id: 'COM-123906c', count: 10 },
                    { id: 'COM-123908', count: 10 },
                    { id: 'COM-124047', count: 15 }
                ]
            };

            const wrapper = shallow(<WarehouseTable warehouse={input} />);
            const rows = wrapper.find('tbody > tr');
            expect(rows).toHaveLength(4);
            rows.forEach((row, index) => {
                const columns = row.find('td');
                expect(columns).toHaveLength(2);
                expect(columns.at(0).text()).toMatch(`${input.materials[index].id}:`);
                expect(columns.at(1).text()).toMatch(`${input.materials[index].count}`);
            });
        });
    });

    test("check header", () => {
        const input = {
            name: 'WH-B', totalCount: 33, materials: [
                { id: '3M-Cherry-10mm', count: 1 },
                { id: 'CB0115-CASSRC', count: 5 },
                { id: 'COM-100001', count: 10 },
                { id: 'COM-123906c', count: 6 },
                { id: 'COM-123908', count: 11 }
            ]
        };

        const wrapper = shallow(<WarehouseTable warehouse={input} />);
        const headerColumns = wrapper.find('thead > tr > th');
        expect(headerColumns).toHaveLength(2);
        expect(headerColumns.at(0).text()).toMatch('WH-B');
        expect(headerColumns.at(1).text()).toMatch(`(total ${33})`);
    });
});
