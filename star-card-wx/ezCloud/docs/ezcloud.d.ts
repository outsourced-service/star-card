declare type Aggregate = OperateInput & {
    name: string;
    args?: Record<string, any>;
    aggregate_fields?: Fields | "count" | {
        name: "avg";
        fields: Fields;
    } | {
        name: "sum";
        fields: Fields;
    } | {
        name: "max";
        fields: Fields;
    } | {
        name: "min";
        fields: Fields;
    } | {
        name: "count";
        args?: {
            columns: any;
            distinct?: boolean;
        };
        fields: Fields;
    };
};

export declare interface context {
    getArg: (inputArgName: string | "fz_callback_body" | "fz_payment_callback_input") => any;
    setReturn: (outputArgName: any, value: any) => any;
    uploadMedia: (url: string, headers?: any) => any;
    runGql: (operationName: string | null | undefined, gql: string, variables: object, permission: {
        role: string | "admin";
    }) => any;
    callThirdPartyApi: (operationId: string, args: object) => any;
    callActionFlow: (actionFlowId: string, versionId: number | null, args: any) => any;
    getSeqNextValue: (seqName: string, createIfNotExists?: boolean) => any;
    resetSeqValue: (seqName: string, value: number) => any;
    getWechatMiniAppAccessToken: () => string;
    sendEmail: (toAddress: string, subject: string, fromAlias: string, textBody: string, htmlBody: string) => any;
    log: (msg: string, isError: boolean) => any;
    error: (msg: string, isError: boolean) => any;
    throwException: (errorType: string, errorMsg: string) => any;
    countTokens: (model: string, content: string) => any;
    chatCompletion: (prompt: string) => string;
    uploadMediaDirectly: (url: string) => any;
    getSsoAccountId: () => null | number;
    getSsoUserInfo: () => any;
    generateRSASignature: (privateKey: string, data: any, signatureType: string | "SHA256withRSA") => string;
    validateRSASignature: (publicKey: string, data: any, sign: string, signatureType: string | "SHA256withRSA") => any;
}

declare type Directive = {
    name: string;
    args?: Record<string, any>;
};

export declare interface ezcloud {
    getRequest: () => GetRequestResult;
    clog: (data: any) => void;
    getResponse: () => any;
    getScf: () => GetScfResult;
    getSystem: () => GetSystemResult;
    getPayload: () => any;
    getClientinfo: () => any;
    getCallbackBody: () => any;
    getCallbackInput: () => any;
    find: (inputs: FindInput) => FindResult;
    operate: (inputs: OperateInput) => OperateResult;
    query: (inputs: QueryInput) => Array<any>;
    mutation: (inputs: MutationInput) => {
        [key: string]: any;
    };
    aggregate: (inputs: Aggregate) => {
        min: any;
        avg: any;
        max: any;
        sum: any;
        count: string;
        [key: string]: any;
    };
    queryGetFirstOne: (inputs: QueryGetFirstOne) => {
        [key: string]: any;
    };
    mutationGetFirstOne: (inputs: MutationGetFirstOne) => any;
    genJwtToken: (data?: {
        expires_in?: number;
        [key: string]: any;
    }, secret?: string) => string;
    parseJwtToken: (token?: string, secret?: string) => {
        expires_in: number;
        [key: string]: any;
    };
    md5: (str?: any, bit?: string) => string;
    callActionflow: ({ actionFlowId, versionId, args, }: {
        actionFlowId: string;
        versionId: number | null;
        args: any;
    }) => any;
    callScf: ({ scf_name, payload, scf_dir, }: {
        scf_name?: string | undefined;
        payload?: {} | undefined;
        scf_dir?: string | undefined;
    }) => {
        code: number;
        msg: string;
        data: any;
        [key: string]: any;
    };
    fetchApi: ({ url, method, headers, data, }: {
        url?: string | undefined;
        method?: string | undefined;
        headers?: null | undefined;
        data?: {} | undefined;
    }) => any;
    uploadMedia: ({ url }: {
        url?: string | undefined;
    }) => any;
    callThirdapi: (thirdapi_name?: string, data?: any, headers?: any) => any;
    runGql: (Input: RunGqlInput) => any;
    success: (data?: any, msg?: string) => void;
    fail: (data?: any, msg?: string, code?: number) => void;
}

declare type Field = {
    alias?: string;
    name: string;
    args?: Record<string, any>;
    directives?: Array<Directive>;
    fields?: Fields;
};

declare type Fields = string | Field | Array<Fields>;

declare type FindInput = OperateInput & {
    name: string;
    args?: Record<string, any>;
    page_number?: number;
    page_size?: number;
    fields?: Fields;
    aggregate_fields?: Fields;
};

declare type FindResult = {
    datas: Array<any>;
    aggregate: Record<string, any>;
};

declare type GetRequestResult = Request_2;

declare type GetScfResult = Scf;

declare type GetSystemResult = System;

declare type MutationGetFirstOne = OperateInput & {
    name: string;
    args?: Record<string, any>;
    directives?: Array<Directive>;
    returning_fields?: Fields;
};

declare type MutationInput = OperateInput & {
    name: string;
    args?: Record<string, any>;
    directives?: Array<Directive>;
    fields?: Fields;
};

declare type OperateInput = {
    opMethod?: "query" | "mutation" | "subscription";
    opName?: string;
    opArgs?: {
        [key: string]: any;
    };
    opFields?: Fields;
    variables?: {
        [key: string]: any;
    };
    onInited?: (data: any) => void;
    onMessage?: (message: any, error: any) => void;
};

declare type OperateResult = {
    gql: string;
    variables: {
        [key: string]: any;
    };
    response?: any;
};

declare type QueryGetFirstOne = QueryInput;

declare type QueryInput = OperateInput & {
    name: string;
    args?: Record<string, any>;
    directives?: Array<Directive>;
    fields?: Fields;
};

declare type Request_2 = {
    scf_name: string;
    scf_dir?: string;
    payload?: any;
    clientinfo?: any;
    callback_body?: any;
    callback_input?: any;
};

declare type RunGqlInput = {
    gql: string;
    variables?: {
        [key: string]: any;
    };
    onMessage?: (message: any, error?: any) => void;
};

declare type Scf = {
    scf_config: any;
    scf_dir: string;
    scf_name: string;
    scf_code: string;
    scf_fn: any;
    parameters: any;
    returns: any;
    description: any;
};

declare type System = {
    name: string;
    is_logs: boolean;
    is_developer_auth: boolean;
    pre_middelware_code: string;
    post_middelware_code: string;
    global_config: any;
    thirdapi_id: string;
    af_id: string;
};

export { }
