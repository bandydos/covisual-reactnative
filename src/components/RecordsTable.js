import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export class RecordsTable extends Component {
    render() {
        const { rcrds, num_rcrds } = this.props; // Destructure rcrds from props.
        const tableHead = ['Date', 'Deaths', 'Total deaths'];
        const tableData = []; // Table rows with <td>'s.

        // Push num_rcrds (50) rows.
        for (let i = 0; i < num_rcrds; i++) {
            tableData.push(
                [rcrds[i].date, rcrds[i].deathstoday, rcrds[i].deathstotal]
            )
        }

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
