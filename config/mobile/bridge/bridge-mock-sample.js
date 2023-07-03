const userInfo = {
  userId: 9527,
  mobile: '0',
  customerName: '法外狂徒_张三',
  customerNickname: 'nick',
  orgCode: '0002',
  tradeToken: '2666ed12-1ce5-48ca-acbd-c8ac4fac0899',
  sessionCode: '45eb27e62c0b4f70a179f13e6524bb86',
  isLogin: true,
  bindTrade: true,
};

const userConfig = {
  theme: 'dark', // dark light red
  language: 'zh-CN', // zh-TW  zh-CN
  raise: 'green', // 红涨绿跌 还是绿涨红跌
};

const serverConfig = {
  websocketServer: 'ws://47.112.147.47:10001/socket', //websoket地址
};

module.exports = {
  port: process.env.BRIDGE_MOCK_PORT || 3000,
  response: {
    url: (url, arg) => {
      console.log(`打开${url}?${JSON.stringify(arg)}`);
      return 'to url success';
    },
    view: (v, arg) => {
      console.log(`打开 ${v} 原生视图,传入参数${JSON.stringify(arg)}`);
      return 'open view';
    },
    msg: new Proxy(
      {
        userInfo: () => userInfo,
        getTradeConfig: () => {},
        sessionCodeExpire: (args) => {
          console.log(`登录超时: \n${JSON.stringify(args)}`);
        },
        getUserConfiguration: () => userConfig,
        getServerConfig: () => serverConfig,
      },
      {
        get(target, name) {
          return name in target ? target[name] : (args) => console.log(`收到消息: ${name}, 尚未处理`);
        },
      },
    ),
  },
};
