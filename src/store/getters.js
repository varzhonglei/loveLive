export default {
    getSocket: state => state.socket,
    getChatMan: state => state.chatMan,
    getOwnId: state => state.userInfo._id,
    getOwnAvatarUrl: state => state.userInfo.avatarUrl,
    getOwnUserName: state => state.userInfo.userName,
    getTheOneMsg: (state) => (from_id) => {
        return state.newMsgs.filter(( item, index, arr )=>{
                                return item.from === from_id
                            })
    },

    getNewMsgsLen: state => state.newMsgs.length,
    getNewMsgs: state => state.newMsgs,
    getNewReplysLen: state => {
        try{
            return state.userInfo.newReply.length //用户信息一定时间获取后才有值
        }catch(e){
            return 0
        }
    }
}
