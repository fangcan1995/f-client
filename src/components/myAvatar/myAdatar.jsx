import React,{ Component } from "react";
import { Upload, Icon, message,Avatar } from 'antd';
import './myAdatar.less';

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
        console.log('--------------');
        console.log(info);

        console.log(info.file);
        let newFile=info.file;
        console.log('文件');
        console.log(newFile);
        if (newFile.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (newFile.status === 'done') {
            //message.success(`${info.file.name} file uploaded successfully`);
            // Get this url from response in real world.
            console.log('---------上传的东西------------');
            console.log(newFile.originFileObj);
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
       let disableChange=this.props.disableChange || false; //是否可以替换
        const uploadButton = (
            <Avatar size="large" className="memberPhoto" src={require('../../assets/images/account/picture.png')} />
        );
        const imageUrl = this.state.imageUrl;
        return (
            <Upload
                name="avatarFile"
                className="memberPhoto"
                multiple={false}
                showUploadList={false}
                action="http://172.16.1.221:9090/members/photo?access_token=d36b2fff-1757-4aed-b576-df30f9f9d173"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
                disabled={disableChange}

            >
                {imageUrl ? <Avatar size="large" className="memberPhoto" src={imageUrl} /> : uploadButton}
            </Upload>
        );
    }
}