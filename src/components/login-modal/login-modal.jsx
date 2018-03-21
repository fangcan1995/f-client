import React,{Component} from 'react';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
import Login from '../../containers/login/login'
import { showModal,hideModal } from '../../actions/login-modal';
import '../../containers/loan/loan-index/loan-index.less';

class LoginModal  extends Component {
    state = {
        ModalText: 'Content of the modal dialog',
        visible: false,
        footer:null
      }
      showModal = () => {
        const { dispatch } = this.props;
        dispatch(showModal())
      }
      handleOk = () => {
        this.setState({
          ModalText: 'The modal dialog will be closed after two seconds',
          confirmLoading: true,
        });
        const ctiemout = setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 2000);
      }
      
      handleCancel = () => {
        console.log('Clicked cancel button');
        const { dispatch } = this.props;
        console.log(3)
        dispatch(hideModal())
      }
      componentWillUnmount(){
        clearTimeout(this.ctiemout)
      }
      render(){
        const { auth,loginModal } = this.props;
        return (
            <Modal title="您还未登录，请先登录"
            visible={loginModal.visible}
            onOk={this.handleOk}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel}
            footer={this.state.footer}
            className='modal'
          >
           
            <Login/>
            
          </Modal>
        )
      }
}
function select(state) {
    const { auth, loginModal } = state.toJS();
    return {
      auth,
      loginModal
    };
  }
  export default connect(select)(LoginModal);