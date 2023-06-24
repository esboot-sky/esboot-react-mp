interface ICodeStorageData {
  [prop: string]: any;
}

export default new (class CodeStorage {
  data: ICodeStorageData = {};

  language = 'zh-CN';

  token = '';

  tradeToken = '';
})();
