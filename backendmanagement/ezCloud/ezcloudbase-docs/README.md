ezcloubase是一个客户端库，可以通过实例化拿到ezclient和ezserver

ezclient用于与FUNTORZ或者MOMEN直连，操作后端数据库或接口
ezserver用于连接基于AF环境的SCF云函数，操作后端数据库或调用接口

下面是ezclient和ezserver的部分类型定义
```typescript

// EzClient和EzServer公共部分
type Directive = {
  name: string;
  args?: Record<string, any>;
};

type Field = {
  alias?: string;
  name: string;
  args?: Record<string, any>;
  directives?: Array<Directive>;
  fields?: Fields;
};

export type Fields = string | Field | Array<Fields>;

export type RunGqlInput = {
  gql: string;
  variables?: { [key: string]: any };
  onMessage?: (message: any, error?: any) => void;
};

export type OperateInput = {
  opMethod?: "query" | "mutation" | "subscription"; // 1.query 2.mutation 3.subscription
  opName?: string; // clientQuery_1234546646
  opArgs?: { [key: string]: any };
  opFields?: Fields;
  variables?: { [key: string]: any };
  onInited?: (data: any) => void;
  onMessage?: (message: any, error: any) => void;
};

export type OperateResult = {
  gql: string;
  variables: { [key: string]: any };
  response?: any;
};


export type QueryInput = OperateInput & {
  opName?: string;
  name: string;
  args?: Record<string, any>;
  directives?: Array<Directive>;
  fields?: Fields;
};
export type MutationInput = OperateInput & {
  opName?: string;
  name: string;
  args?: Record<string, any>;
  directives?: Array<Directive>;
  fields?: Fields;
};


// EzClient独有部分
export type EzClientConfig = (
  | {
      project_id: string;
      project_type: "FUNCTORZ" | "MOMEN";
      headers?: Record<string, any>;
    }
  | {
      endpoint_url: string;
      headers?: Record<string, any>;
    }
) & {
  editor_token?: string;
  editor_token_expires_in?: number;
  project_token?: string;
  project_token_expires_in?: number;
  [key: string]: any; // 索引签名，允许任意属性
};

export type FileInput = File & { name?: string; path?: string };
export type UploadInput = {
  onReady?: (result: Record<string, any>) => void; // 上传准备就绪
  onProgress?: (loaded: number, total: number) => void; // 上传进度
};

export type UploadResult = {
  uploadUrl: string;
  uploadHeaders: Record<string, any>;
  downloadUrl: string;
  contentType: string;
  imageId?: any;
  fileId?: any;
  videoId?: any;
  [key: string]: any;
};

export type CallActionflowInput = {
    versionId?: number | undefined;
    actionFlowId?: string | undefined;
    args?: {} | undefined;
}


// EzServer独有部分
export type EzServerConfig = (
  | {
      project_type: "FUNCTORZ" | "MOMEN";
      project_id: string;
      callback_id: string;
      clientinfo?: Record<string, any>;
    }
  | {
      callback_url: string;
      clientinfo?: Record<string, any>;
    }
) & {
  developer_token?: string;
  developer_token_expires_in?: number;
  [key: string]: any; // 索引签名，允许任意属性
};

export type CallScfInput = {
    scf_dir?: string;
    scf_name: string;
    payload?: Record<string, any>;
}
```
