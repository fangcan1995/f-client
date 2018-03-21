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
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            //message.success(`${info.file.name} file uploaded successfully`);
            // Get this url from response in real world.
            console.log('---------上传的东西------------');
            console.log(info.file.originFileObj);
            this.getBase64(info.file.originFileObj, imageUrl => {
                this.setState({
                imageUrl,
                loading: false,
                })
            });
        }else if (info.file.status === 'error') {
            message.error(`上传失败`);

        }
    }
    render() {
       let disableChange=this.props.disableChange || false; //是否可以替换
        /*if(this.props.disableChange){
            disableChange=true;
        }*/
        /*const props = {
            name:"avatar",
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                authorization: 'authorization-text',
            },
            multiple: false,
            className:"memberPhoto",
            showUploadList:false,
            beforeUpload(file, fileList) {
                console.log(file, fileList);
                const isJPG = file.type === 'image/jpeg'||'image/png'||'image/jpg';
                if (!isJPG) {
                    message.error('不支持您上次的文件格式!');
                }
                const isLt1M = file.size / 1024 / 1024 < 1;
                if (!isLt1M) {
                    message.error('图片大小不能超出1M!');
                }
                return isJPG && isLt1M;
                /!*return new Promise((resolve) => {
                    console.log('start check');
                    setTimeout(() => {
                        console.log('check finshed');
                        resolve(file);
                    }, 3000);
                });*!/
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                    this.getBase64(info.file.originFileObj, imageUrl => {
                        this.setState({
                            imageUrl,
                            loading: false,
                        })
                    });
                } else if (info.file.status === 'error') {
                    message.error(`上传失败`);

                }
            },
        };*/
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
                action="//jsonplaceholder.typicode.com/posts/"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
                disabled={disableChange}

            >
                {imageUrl ? <Avatar size="large" className="memberPhoto" src={imageUrl} /> : uploadButton}
            </Upload>
        );
    }
}