import { IEpicInfo, IIteration } from "./interfaces";

let epics: IEpicInfo[] = [
  {
    id: '0',
    title: '添加商品'
  },
  {
    id: '1',
    title: '查看购物车'
  },
  {
    id: '2',
    title: '编辑购物车'
  },
  {
    id: '3',
    title: '下单'
  }
];

let iterations: IIteration[] = [
  {
    id: '0',
    index: 1,
    title: '最小可行的购物车',
    isActive: false,
    stories: [
      {
        id: '1',
        title: '添加期望商品',
        description: '消费者在浏览商品详情时，将期望购买的商品添加到购物车，以方便批量购买。',
        epicId: '0'
      },
      {
        id: '6',
        title: '查看商品清单',
        description: '',
        epicId: '1'
      },
      {
        id: '7',
        title: '查看商品总计',
        epicId: '1'
      },
      {
        id: '8',
        title: '跳转到商品详情',
        epicId: '1'
      },
      {
        id: '15',
        title: '修改单个商品购买数量',
        epicId: '2'
      },
      {
        id: '16',
        title: '删除单个商品',
        epicId: '2'
      },
      {
        id: '17',
        title: '修改单个商品规格',
        epicId: '2'
      },
      {
        id: '23',
        title: '一键下单',
        epicId: '3'
      },
    ]
  },
  {
    id: '1',
    index: 2,
    title: '增强版的购物车',
    isActive: true,
    stories: [
      {
        id: '2',
        title: '添加配搭商品',
        description: '消费者在查看购物车清单的时候，可以顺便将相关的配搭商品添加到购物车，以便用户进行快捷的配搭。',
        epicId: '0'
      },
      {
        id: '3',
        title: '添加促销商品',
        description: '消费者可以在促销页将商品直接添加到购物车，以便消费者快捷购买。',
        epicId: '0'
      },
      {
        id: '9',
        title: '商品排序',
        epicId: '1'
      },
      {
        id: '10',
        title: '查看商品折扣信息',
        epicId: '1'
      },
      {
        id: '18',
        title: '批量删除商品',
        epicId: '2'
      },
      {
        id: '19',
        title: '一键清空',
        epicId: '2'
      },
      {
        id: '20',
        title: '将商品移入收藏夹',
        epicId: '2'
      },
      {
        id: '24',
        title: '选择单个或多个商品下单',
        epicId: '3'
      },
      {
        id: '25',
        title: '查看商品购买信息',
        epicId: '3'
      },
    ]
  },
  {
    id: '2',
    index: 3,
    title: '豪华版的购物车',
    isActive: false,
    stories: [
      {
        id: '4',
        title: '添加收藏商品',
        epicId: '0'
      },
      {
        id: '5',
        title: '添加历史购买商品',
        epicId: '0'
      },
      {
        id: '11',
        title: '查看商品包邮信息',
        epicId: '1'
      },
      {
        id: '12',
        title: '查看商品分类汇总信息',
        epicId: '1'
      },
      {
        id: '13',
        title: '商品比较',
        epicId: '1'
      },
      {
        id: '14',
        title: '查看商品是否失效',
        epicId: '1'
      },
      {
        id: '21',
        title: '一键删除失效商品',
        epicId: '2'
      },
      {
        id: '22',
        title: '领取优惠券',
        epicId: '2'
      },
      {
        id: '26',
        title: '选择是否分拆订单',
        epicId: '3'
      }
    ]
  }
];

export const storyMapData = {epics, iterations};