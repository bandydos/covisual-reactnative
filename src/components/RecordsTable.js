import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export class RecordsTable extends Component {
    render() {
        const { rcrds, num_rcrds } = this.props; // Destructure rcrds from props.
        const trs = []; // Table rows with <td>'s.

        // Push num_rcrds (50) rows.
        //for (let i = 0; i < num_rcrds; i++) {
        //  trs.push(
        //    <tr key={i}>
        //      <td>{rcrds[i].date}</td>
        //    <td>{rcrds[i].deathstoday}</td>
        //  <td>{rcrds[i].deathstotal}</td>
        //  </tr>
        // )
        // }

        const tableHead = ['Head', 'Head2', 'Head3', 'Head4'];
        const tableData = [
            ['1', '2', '3', '4'],
            ['a', 'b', 'c', 'd'],
            ['1', '2', '3', '456\n789'],
            ['a', 'b', 'c', 'd']
        ];

        // JSX to return on render.
        return (
            <View>
                <View>
                    <View>
                        <Table>
                            <Row data={tableHead} />
                            <Rows data={tableData} />
                        </Table>
                    </View>
                </View>
            </View>
        )
    }
}

export default RecordsTable
