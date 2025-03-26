import { Fields } from 'ezcloudbase/dist/types/ezcloud';
export const getFileds = (name: string, args?: Record<string, any>, aggregate?: Fields, nodes?: Fields) => ({
    name: name + '_aggregate',
    args,
    fields: [getAggregate(aggregate), nodes ? getNodes(nodes) : '']
})

export const getAggregate = (fields: Fields = 'count') => ({ name: 'aggregate', fields })
export const getNodes = (fields: Fields = 'id') => ({ name: 'nodes', fields })
export const user_aggregate = getAggregate()
export const order_info_aggregate = getAggregate()