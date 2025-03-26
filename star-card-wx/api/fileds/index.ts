import { Fields } from 'ezcloudbase/dist/types/ezcloud';
export * as aggregate from "./aggregate"
import * as fields from "./fields"
export * from "./fields"
const get = (name: keyof typeof fields) => {
    const field = fields[name];
    return field 
};

export const getFileds = (name: any, args?: Record<string, any>, fields?: Fields) => ({
    name: name,
    args,
    fields: [get(name), fields]
})
