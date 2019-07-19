export const state = () => {
    return {
        // 机票的信息
        infoData: {
            insurances: [],
            seat_infos: {}
        },
        //  总价格
        allPrice: 0,
        count:0
    }
}
export const mutations = {
    // 设置机票的信息
    setInfoData(state, data) {     
        state.infoData = data;
    },
    //更新机票价格
    setAllPrice(state, data) {
        state.allPrice = data
    },
    //   更新机票数量
    setCount(state, data) {
        state.count = data
    }
}