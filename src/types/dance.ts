/**约舞接口相关类型 */
export interface DanceListItem {
  id: string,
  title: string,
  address: string,
  verbPerson: string, //发起人
  date: string, // YYYY-mm-dd
}
export interface DanceList {
  list: Array<DanceListItem>
}