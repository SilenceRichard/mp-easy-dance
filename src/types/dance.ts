/**约舞接口相关类型 */
export interface DanceListItem {
  id: string,
  title: string,
  address: string,
  date: string, // YYYY-mm-dd
  verbPerson: string, //发起人
  avatar: string,
  imageUrl: string,
}
export interface DanceList {
  list: Array<DanceListItem>
}