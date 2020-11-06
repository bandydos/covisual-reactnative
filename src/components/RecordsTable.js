import React, { Component } from 'react'
import { View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

export class RecordsTable extends Component {
    render() {
        const { rcrds, num_rcrds } = this.props; // Destructure rcrds from props.

        const tableHead = ['Date', 'Deaths', 'Total deaths'];
        const tableData = [];

        // Push num_rcrds (50) rows.
        for (let i = 0; i < num_rcrds; i++) {
            tableData.push(
                [rcrds[i].date, rcrds[i].deathstoday, rcrds[i].deathstotal]
            )
        }

        // JSX to return on render.
        return (
            <View>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Row data={tableHead} style={{ height: 40, backgroundColor: '#f1f8ff' }} textStyle={{textAlign:"center"}} />
                    <Rows data={tableData} textStyle={{textAlign:"center"}}/>
                </Table>
            </View>
        )
    }
}

export default RecordsTable
