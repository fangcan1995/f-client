import React from 'react';
import PropTypes from 'prop-types';

export default class ModalPlan extends React.Component {
    /*constructor(props) {
        super(props);
        console.log(props);
    }*/
    componentDidMount () {
        //this.props.dispatch(actionsMyInvestments.getData());
        console.log(this.props);

        console.log('能调用父级的方法吗');
        //this.getData();
    }

    render() {
        console.log('this.props-------');
        console.log(this.props);

        return (
                    <div className="table__wrapper">
                        <table className="tableList">
                            <thead>
                            <tr>
                                <th>回款时间{this.props.proId}</th>
                                <th>回款期数</th>
                                <th>已回款（元）</th>
                                <th>待回本金（元）</th>
                                <th>待回利息（元）</th>
                                <th>逾期罚息（元）</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>2017-05-10</td>
                                <td>1</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>1000.00</td>
                                <td>0.00</td>
                            </tr>
                            <tr>
                                <td>2017-06-10</td>
                                <td>2</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>1000.00</td>
                                <td>0.00</td>
                            </tr>
                            <tr>
                                <td>2017-07-10</td>
                                <td>3</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>1000.00</td>
                                <td>0.00</td>
                            </tr>
                            <tr>
                                <td>2017-08-10</td>
                                <td>4</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>1000.00</td>
                                <td>0.00</td>
                            </tr>
                            <tr>
                                <td>2017-09-10</td>
                                <td>5</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>1000.00</td>
                                <td>0.00</td>
                            </tr>
                            <tr>
                                <td>2017-10-10</td>
                                <td>6</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>1000.00</td>
                                <td>0.00</td>
                            </tr>
                            <tr>
                                <td>2017-11-10</td>
                                <td>7</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>1000.00</td>
                                <td>0.00</td>
                            </tr>
                            <tr>
                                <td>2017-12-10</td>
                                <td>8</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>1000.00</td>
                                <td>0.00</td>
                            </tr>
                            <tr>
                                <td>2018-01-10</td>
                                <td>9</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>1000.00</td>
                                <td>0.00</td>
                            </tr>
                            <tr>
                                <td>2018-02-10</td>
                                <td>10</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>1000.00</td>
                                <td>0.00</td>
                            </tr>
                            <tr>
                                <td>2018-03-10</td>
                                <td>11</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>1000.00</td>
                                <td>0.00</td>
                            </tr>
                            <tr>
                                <td>2018-04-10</td>
                                <td>12</td>
                                <td>0.00</td>
                                <td>100000.00</td>
                                <td>1000.00</td>
                                <td>0.00</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
        );
    }
};