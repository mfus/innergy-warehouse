import _ from 'lodash';
import { Warehouse } from '../warehouse';

const InventoryStateParser: (data: string[][]) => Warehouse[] = (data) => {
    if (!data) {
        return [];
    }

    const parsedRows = data.map(row => {
        const [, materialId, placement] = [...row];
        if (!materialId || !placement) {
            return [];
        }

        return placement.split('|')
            .map(w => /(?<warehouse>[^,]+),(?<count>\d+)/.exec(w))
            .filter(x => !!x)
            .map(x => {
                return {
                    materialId,
                    warehouse: x?.groups?.warehouse ?? '',
                    count: +(x?.groups?.count ?? 0)
                }
            })
    }).reduce((agg, items) => {
        agg.push(...items);
        return agg;
    }, []);

    const warehouses = _(parsedRows)
        .groupBy(x => x.warehouse)
        .map((val, key) => {

            let totalCount = 0;
            const materials = _(val).map(x => {
                totalCount += x.count;
                return {
                    id: x.materialId,
                    count: x.count
                }
            }).orderBy(x => x.id, ['asc'])
                .valueOf()

            return {
                name: key,
                totalCount,
                materials
            };
        }).orderBy(['totalCount', 'name'], ['desc', 'desc'])
        .valueOf();


    return warehouses;
}

export default InventoryStateParser;