import React,{ Component } from "react";
import { Upload, Icon, message,Avatar } from 'antd';
import './myAdatar.less';
import {urls} from './../../utils/url';
import tx from './../../assets/images/myAccount/tx.jpg';
import cookie from 'js-cookie';
import  {memberAc}  from '../../actions/member';
export default class MyAvatar extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        loading: false,
    };
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    beforeUpload(file) {
        const isImg = file.type === 'image/jpeg'||'image/png'||'image/jpg';
        if (!isImg) {
            message.error('不支持您上次的文件格式!');
        }
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
            message.error('图片大小必须小于1M!');
        }
        return isImg && isLt1M;
    }
    handleChange = (info) => {
        let newFile=info.file;
        if (newFile.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (newFile.status === 'done') {
            this.getBase64(newFile.originFileObj, imageUrl => {
                this.setState({
                imageUrl,
                loading: false,
                })
            });
        }else if (newFile.status === 'error') {
            message.error(`上传失败`);

        }
    }
    render() {
        let {photo}=this.props;
        console.log('头像');
        console.log(photo);
       let disableChange=this.props.disableChange || false; //是否可以替换
        let photo_url=``;
        if(photo){
            photo_url=photo;
        }else{
            photo_url=tx;
        }
        /*if(photo!=``){
            photo_url=photo;
        }else{
            photo_url=`http://www.baba88.com/static/quote_518/images/logo.png`;
        }*/
        const uploadButton = (
            <Avatar size="large" className="memberPhoto" src={photo_url} />
        );
        const imageUrl = this.state.imageUrl;
        const token = cookie.getJSON('token') || {};
        const { access_token } = token;
        const actionUrl=`${urls}/members/photo?access_token=${access_token}`;
        console.log(actionUrl);
        return (
            <Upload
                name="file"
                className="memberPhoto"
                multiple={false}
                showUploadList={false}
                action={actionUrl}
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
                disabled={disableChange}

            >
                {imageUrl ? <Avatar size="large" className="memberPhoto" src={imageUrl} /> : uploadButton}
            </Upload>
        );
    }
}