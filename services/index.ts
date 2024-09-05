/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

import { IRequestOptions, IRequestConfig, getConfigs, axios } from './serviceOptions';
export const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class UsersService {
  /**
   * Sửa Người dùng
   */
  static updateOneBase(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: UserEntity;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserEntity> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Xoá Người dùng
   */
  static deleteOneBase(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Chi tiết Người dùng
   */
  static getOneBase(
    params: {
      /**  */
      id: number;
      /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
      fields?: any | null[];
      /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
      join?: any | null[];
      /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
      cache?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserEntity> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { fields: params['fields'], join: params['join'], cache: params['cache'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Thêm Người dùng
   */
  static createOneBase(
    params: {
      /** requestBody */
      body?: UserEntity;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserEntity> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Danh sách Người dùng
   */
  static getManyBase(
    params: {
      /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
      fields?: any | null[];
      /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
      s?: string;
      /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
      filter?: any | null[];
      /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
      or?: any | null[];
      /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
      sort?: any | null[];
      /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
      join?: any | null[];
      /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
      limit?: number;
      /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
      offset?: number;
      /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
      page?: number;
      /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
      cache?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<GetManyUserEntityResponseDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        fields: params['fields'],
        s: params['s'],
        filter: params['filter'],
        or: params['or'],
        sort: params['sort'],
        join: params['join'],
        limit: params['limit'],
        offset: params['offset'],
        page: params['page'],
        cache: params['cache']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Switch 2fAuthentication for user
   */
  static userControllerSwitchTwoFactorAuthentication(
    params: {
      /** requestBody */
      body?: SwitchAuthenDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/switch-security';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class AuthService {
  /**
   * Đăng nhập bằng SĐT/Password
   */
  static authControllerLogin(
    params: {
      /** requestBody */
      body?: LoginDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/auth/login';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Đăng ký tài khoản
   */
  static authControllerRegister(
    params: {
      /** requestBody */
      body?: RegisterDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserEntity> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/auth/register';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Generate QRCode
   */
  static authControllerGenerateQrCode(
    params: {
      /**  */
      email: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/auth/generate/{email}';
      url = url.replace('{email}', params['email'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Turn on 2fAuthentication
   */
  static authControllerTurnOnTwoFactorAuthentication(
    params: {
      /** requestBody */
      body?: twofactorAuthenDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/auth/turn-on';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Kiểm tra Email
   */
  static authControllerCheckEmail(
    params: {
      /**  */
      email: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/auth/checkEmail/{email}';
      url = url.replace('{email}', params['email'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Reset Password
   */
  static authControllerResetPassword(
    params: {
      /** requestBody */
      body?: ResetPassDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/auth/resetPassword';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class CdnService {
  /**
   * Upload file User/Project
   */
  static cdnControllerUploadFile(
    params: {
      /**  */
      file: any;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/cdn/upload';

      const configs: IRequestConfig = getConfigs('post', 'multipart/form-data', url, options);

      let data = null;
      data = new FormData();
      if (params['file']) {
        if (Object.prototype.toString.call(params['file']) === '[object Array]') {
          for (const item of params['file']) {
            data.append('file', item as any);
          }
        } else {
          data.append('file', params['file'] as any);
        }
      }

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class ProjectsService {
  /**
   * Custom data by Id
   */
  static projectControllerCustomData(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/projects/custom/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Chi tiết Dự án
   */
  static getOneBase(
    params: {
      /**  */
      id: number;
      /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
      fields?: any | null[];
      /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
      join?: any | null[];
      /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
      cache?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ProjectEntity> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/projects/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { fields: params['fields'], join: params['join'], cache: params['cache'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Sửa Dự án
   */
  static updateOneBase(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: ProjectEntity;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ProjectEntity> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/projects/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Xoá Dự án
   */
  static deleteOneBase(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/projects/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Danh sách Dự án
   */
  static getManyBase(
    params: {
      /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
      fields?: any | null[];
      /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
      s?: string;
      /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
      filter?: any | null[];
      /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
      or?: any | null[];
      /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
      sort?: any | null[];
      /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
      join?: any | null[];
      /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
      limit?: number;
      /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
      offset?: number;
      /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
      page?: number;
      /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
      cache?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<GetManyProjectEntityResponseDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/projects';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        fields: params['fields'],
        s: params['s'],
        filter: params['filter'],
        or: params['or'],
        sort: params['sort'],
        join: params['join'],
        limit: params['limit'],
        offset: params['offset'],
        page: params['page'],
        cache: params['cache']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Thêm Dự án
   */
  static createOneBase(
    params: {
      /** requestBody */
      body?: ProjectEntity;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ProjectEntity> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/projects';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class SkillService {
  /**
   * Chi tiết Kỹ năng
   */
  static getOneBase(
    params: {
      /**  */
      id: number;
      /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
      fields?: any | null[];
      /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
      join?: any | null[];
      /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
      cache?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<SkillEntity> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/skill/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { fields: params['fields'], join: params['join'], cache: params['cache'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Sửa Kỹ năng
   */
  static updateOneBase(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: SkillEntity;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<SkillEntity> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/skill/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Xoá Kỹ năng
   */
  static deleteOneBase(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/skill/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Danh sách Kỹ năng
   */
  static getManyBase(
    params: {
      /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
      fields?: any | null[];
      /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
      s?: string;
      /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
      filter?: any | null[];
      /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
      or?: any | null[];
      /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
      sort?: any | null[];
      /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
      join?: any | null[];
      /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
      limit?: number;
      /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
      offset?: number;
      /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
      page?: number;
      /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
      cache?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<GetManySkillEntityResponseDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/skill';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        fields: params['fields'],
        s: params['s'],
        filter: params['filter'],
        or: params['or'],
        sort: params['sort'],
        join: params['join'],
        limit: params['limit'],
        offset: params['offset'],
        page: params['page'],
        cache: params['cache']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Thêm Kỹ năng
   */
  static createOneBase(
    params: {
      /** requestBody */
      body?: SkillEntity;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<SkillEntity> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/skill';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class UsersPositionService {
  /**
   * Chi tiết Vị trí
   */
  static getOneBase(
    params: {
      /**  */
      id: number;
      /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
      fields?: any | null[];
      /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
      join?: any | null[];
      /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
      cache?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserPositionEntity> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users-position/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { fields: params['fields'], join: params['join'], cache: params['cache'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Sửa Vị trí
   */
  static updateOneBase(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: UserPositionEntity;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserPositionEntity> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users-position/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Xoá Vị trí
   */
  static deleteOneBase(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users-position/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Danh sách Vị trí
   */
  static getManyBase(
    params: {
      /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
      fields?: any | null[];
      /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
      s?: string;
      /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
      filter?: any | null[];
      /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
      or?: any | null[];
      /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
      sort?: any | null[];
      /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
      join?: any | null[];
      /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
      limit?: number;
      /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
      offset?: number;
      /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
      page?: number;
      /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
      cache?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<GetManyUserPositionEntityResponseDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users-position';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        fields: params['fields'],
        s: params['s'],
        filter: params['filter'],
        or: params['or'],
        sort: params['sort'],
        join: params['join'],
        limit: params['limit'],
        offset: params['offset'],
        page: params['page'],
        cache: params['cache']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Thêm Vị trí
   */
  static createOneBase(
    params: {
      /** requestBody */
      body?: UserPositionEntity;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserPositionEntity> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users-position';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class DashboardService {
  /**
   * Biểu đồ tăng trưởng theo tháng
   */
  static dashboardControllerByMonth(
    params: {
      /**  */
      month: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/dashboard/byMonth';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { month: params['month'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class RolesService {
  /**
   * Danh sách Role
   */
  static getManyBase(
    params: {
      /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
      fields?: any | null[];
      /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
      s?: string;
      /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
      filter?: any | null[];
      /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
      or?: any | null[];
      /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
      sort?: any | null[];
      /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
      join?: any | null[];
      /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
      limit?: number;
      /** Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> */
      offset?: number;
      /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
      page?: number;
      /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
      cache?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<GetManyRoleEntityResponseDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/roles';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        fields: params['fields'],
        s: params['s'],
        filter: params['filter'],
        or: params['or'],
        sort: params['sort'],
        join: params['join'],
        limit: params['limit'],
        offset: params['offset'],
        page: params['page'],
        cache: params['cache']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Thêm Role
   */
  static createOneBase(
    params: {
      /** requestBody */
      body?: RoleEntity;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<RoleEntity> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/roles';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Danh sách chức năng
   */
  static roleControllerRoutes(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/roles/routes';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Cập nhật nhiều nhóm Quyền
   */
  static roleControllerUpdateMany(
    params: {
      /** requestBody */
      body?: RoleEntity[];
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/roles/bulk';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Chi tiết Role
   */
  static getOneBase(
    params: {
      /**  */
      id: number;
      /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
      fields?: any | null[];
      /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
      join?: any | null[];
      /** Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> */
      cache?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<RoleEntity> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/roles/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { fields: params['fields'], join: params['join'], cache: params['cache'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Sửa Role
   */
  static updateOneBase(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: RoleEntity;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<RoleEntity> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/roles/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Xoá Role
   */
  static deleteOneBase(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/roles/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export interface GetManyUserEntityResponseDto {
  /**  */
  data: UserEntity[];

  /**  */
  count: number;

  /**  */
  total: number;

  /**  */
  page: number;

  /**  */
  pageCount: number;
}

export interface UserEntity {
  /** ID */
  id?: number;

  /** Thời gian tạo */
  createdAt?: Date;

  /** Thời gian cập nhật */
  updatedAt?: Date;

  /** Thời gian xoá */
  deletedAt?: Date;

  /** Tên */
  name: string;

  /** Tên account */
  accountName: string;

  /** Email */
  email: string;

  /** Số điện thoại */
  tel: string;

  /** Giới tính */
  gender?: EnumUserEntityGender;

  /** Mật khẩu */
  password: string;

  /** Role ID */
  roleId?: number;

  /** Thời gian nghỉ việc */
  leaveDate?: Date;

  /** Thời gian onboard */
  onboardDate?: Date;

  /** Địa chỉ */
  address?: string;

  /** Trạng thái */
  status: EnumUserEntityStatus;

  /** Ảnh */
  avatar?: string;

  /** Ghi chú */
  note?: string;

  /** Có onsite không? */
  onsite?: string;

  /** Địa điểm làm việc? */
  location?: EnumUserEntityLocation;

  /** Ngày sinh */
  dob?: Date;

  /** Id vị trí */
  userPositionId?: number;

  /** twoFactorAuthenticationSecret */
  twoFactorAuthenticationSecret?: string;

  /** isTwoFactorAuthenticationEnabled */
  isTwoFactorAuthenticationEnabled?: boolean;
}

export interface SwitchAuthenDto {
  /** ID */
  id?: number;

  /** Giá trị của Switch */
  value: boolean;
}

export interface LoginDto {
  /** Email */
  email: string;

  /** Mật khẩu */
  password: string;
}

export interface RegisterDto {
  /** Tên */
  name: string;

  /** Email */
  email: string;

  /** Số điện thoại */
  tel: string;

  /** Mật khẩu */
  password: string;
}

export interface twofactorAuthenDto {
  /** Email */
  email: string;

  /** twoFactorAuthenticationCode */
  twoFactorAuthenticationCode: string;
}

export interface ResetPassDto {
  /** Email */
  email: string;

  /** Mật khẩu */
  password: string;
}

export interface GetManyProjectEntityResponseDto {
  /**  */
  data: ProjectEntity[];

  /**  */
  count: number;

  /**  */
  total: number;

  /**  */
  page: number;

  /**  */
  pageCount: number;
}

export interface MemberProject {
  /** Tên thành viên */
  userId: string;

  /** Vị trí thành viên */
  userPositionId?: string;

  /** Ngày tham gia */
  joinDate?: Date;

  /** Ngày ngừng tham gia */
  stopDate?: Date;

  /** Id kỹ năng */
  skillId?: number[];
}

export interface ProjectEntity {
  /** ID */
  id?: number;

  /** Thời gian tạo */
  createdAt?: Date;

  /** Thời gian cập nhật */
  updatedAt?: Date;

  /** Thời gian xoá */
  deletedAt?: Date;

  /** Tên */
  name: string;

  /** Loại dự án */
  typeProject: EnumProjectEntityTypeProject;

  /** PIC */
  pic?: string;

  /** Ngày bắt đầu */
  startDate: Date;

  /** Ngày kết thúc */
  endDate?: Date;

  /** Trạng thái */
  status: EnumProjectEntityStatus;

  /** Ghi chú */
  note?: string;

  /** Thành viên */
  member?: MemberProject[];

  /** Mã tự random */
  code?: string;
}

export interface GetManySkillEntityResponseDto {
  /**  */
  data: SkillEntity[];

  /**  */
  count: number;

  /**  */
  total: number;

  /**  */
  page: number;

  /**  */
  pageCount: number;
}

export interface SkillEntity {
  /** ID */
  id?: number;

  /** Thời gian tạo */
  createdAt?: Date;

  /** Thời gian cập nhật */
  updatedAt?: Date;

  /** Thời gian xoá */
  deletedAt?: Date;

  /** Tên kỹ năng */
  name: string;

  /** Id vị trí */
  userPositionId?: number;
}

export interface GetManyUserPositionEntityResponseDto {
  /**  */
  data: UserPositionEntity[];

  /**  */
  count: number;

  /**  */
  total: number;

  /**  */
  page: number;

  /**  */
  pageCount: number;
}

export interface UserPositionEntity {
  /** ID */
  id?: number;

  /** Thời gian tạo */
  createdAt?: Date;

  /** Thời gian cập nhật */
  updatedAt?: Date;

  /** Thời gian xoá */
  deletedAt?: Date;

  /** Tên vị trí */
  name: string;

  /** Kinh nghiệm */
  experience?: EnumUserPositionEntityExperience;
}

export interface GetManyRoleEntityResponseDto {
  /**  */
  data: RoleEntity[];

  /**  */
  count: number;

  /**  */
  total: number;

  /**  */
  page: number;

  /**  */
  pageCount: number;
}

export interface RoleEntity {
  /** ID */
  id?: number;

  /** Thời gian tạo */
  createdAt?: Date;

  /** Thời gian cập nhật */
  updatedAt?: Date;

  /** Thời gian xoá */
  deletedAt?: Date;

  /** Tên nhóm */
  name: string;

  /** Quyền */
  permissions: string[];
}
export enum EnumUserEntityGender {
  'male' = 'male',
  'female' = 'female'
}
export enum EnumUserEntityStatus {
  'active' = 'active',
  'inactive' = 'inactive',
  'waiting' = 'waiting',
  'pool' = 'pool'
}
export enum EnumUserEntityLocation {
  'hanoi' = 'hanoi',
  'hcm' = 'hcm',
  'danang' = 'danang'
}
export enum EnumProjectEntityTypeProject {
  'gdc' = 'gdc',
  'nonGDC' = 'nonGDC'
}
export enum EnumProjectEntityStatus {
  'complete' = 'complete',
  'inProgress' = 'inProgress',
  'pool' = 'pool'
}
export enum EnumUserPositionEntityExperience {
  'se01' = 'se01',
  'se02' = 'se02',
  'se03' = 'se03',
  'se04' = 'se04',
  'se05' = 'se05'
}
