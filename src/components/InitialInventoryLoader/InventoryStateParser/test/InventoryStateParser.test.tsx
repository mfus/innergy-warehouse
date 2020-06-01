import InventoryStateParser from "../InventoryStateParser";

describe('InventoryStateParser', () => {
    test('no data', () => {
        const parsed = InventoryStateParser([]);
        expect(parsed).toBeTruthy();
        expect(parsed).toHaveLength(0);
    });

    test('corrupted data', () => {
        const parsed = InventoryStateParser([]);
        expect(parsed).toBeTruthy();
        expect(parsed).toHaveLength(0);
    });

    describe('parse', () => {
        const parsed = InventoryStateParser([
            { data: ['Cherry Hardwood Arched Door - PS', 'COM-100001', 'WH-A,5|WH-B,10'] },
            { data: ['Maple Dovetail Drawerbox', 'COM-124047', 'WH-A,15'] },
            { data: ['Generic Wire Pull', 'COM-123906c', 'WH-A,10|WH-B,6|WH-C,2'] },
            { data: ['Yankee Hardware 110 Deg. Hinge', 'COM-123908', 'WH-A,10|WH-B,11'] },
            { data: ['Hdw Accuride CB0115-CASSRC - Locking Handle Kit - Black', 'CB0115-CASSRC', 'WH-C,13|WH-B,5'] },
            { data: ['Veneer - Charter Industries - 3M Adhesive Backed - Cherry 10mm - Paper Back', '3M-Cherry-10mm', 'WH-A,10|WH-B,1'] },
            { data: ['Veneer - Cherry Rotary 1 FSC', 'COM-123823', 'WH-C,10'] },
            { data: ['MDF, CARB2, 1 1/8"', 'COM-101734', 'WH-C,8'] }
        ]);

        test('check warehouse order', () => {

            const expected = [
                { name: 'WH-A' },
                { name: 'WH-C' },
                { name: 'WH-B' }
            ]

            expect(parsed).toMatchObject(expected);
        })

        test('check warehouse total count', () => {
            const expected = [
                { totalCount: 50 },
                { totalCount: 33 },
                { totalCount: 33 }
            ]

            expect(parsed).toMatchObject(expected);
        })

        test('check material order', () => {
            const expected = [
                {
                    materials: [
                        { id: '3M-Cherry-10mm' },
                        { id: 'COM-100001' },
                        { id: 'COM-123906c' },
                        { id: 'COM-123908' },
                        { id: 'COM-124047' }
                    ]
                },
                {
                    materials: [
                        { id: 'CB0115-CASSRC' },
                        { id: 'COM-101734' },
                        { id: 'COM-123823' },
                        { id: 'COM-123906c' }
                    ]
                },
                {
                    materials: [
                        { id: '3M-Cherry-10mm' },
                        { id: 'CB0115-CASSRC' },
                        { id: 'COM-100001' },
                        { id: 'COM-123906c' },
                        { id: 'COM-123908' }
                    ]
                }
            ]

            expect(parsed).toMatchObject(expected);
        });

        test('check material count', () => {

            const expected = [
                {
                    materials: [
                        { count: 10 },
                        { count: 5 },
                        { count: 10 },
                        { count: 10 },
                        { count: 15 }
                    ]
                },
                {
                    materials: [
                        { count: 13 },
                        { count: 8 },
                        { count: 10 },
                        { count: 2 },
                    ]
                },
                {
                    materials: [
                        { count: 1 },
                        { count: 5 },
                        { count: 10 },
                        { count: 6 },
                        { count: 11 }
                    ]
                }
            ]

            expect(parsed).toMatchObject(expected);
        });
    })
});
