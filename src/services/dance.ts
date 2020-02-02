import Request from './request';
import * as DanceType from '@/types/dance';
import { PAGE_SIZE } from '@/constants/list';
const get = new Request().get;

/**
 * 获取约舞列表
 * @param page 
 * @param pageSize 
 */
export const getDanceList: (page: number) => Promise<DanceType.DanceList> =
  (page) => {
    return get('/dance/list', { page, pageSize: PAGE_SIZE })
  }