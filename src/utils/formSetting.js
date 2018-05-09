export const formItemLayout = {
    labelCol: {
        span:6
    },  //label 标签布局
    wrapperCol: {
        span:18
    },  //为输入控件设置布局样式
    hasFeedback:true  //展示校验状态图标，配合 Input 组件使用
};

export function noop() {
    return false;
}