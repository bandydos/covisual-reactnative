import React, { Component } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RecordsTable from './RecordsTable';
import stateOptions from '../data/stateOptions';
import RecordsChart from './RecordsChart';

export class FetchAndDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            records: [],
            val: 'al', // Initial fetch for al.
            lbl: 'Alabama'
        }
    }

    // Function to clean date format (yyyymmdd to dd-mm).
    cleanupDate(d) {
        return d.slice(6) + '/' + d.slice(4, 6);
    }

    // Fetch records.
    fetchRecords = async () => {
        let response;

        // Check props for location scope (total US or single state).
        response = await fetch(`https://api.covidtracking.com/v1/states/${this.state.val}/daily.json`);
        const jsonresponse = await response.json(); // Await as json.

        const recs = []; // Records array.

        // If response.ok (status 200 / 202) === true.
        if (response.ok) {
            for (let i = 0; i < jsonresponse.length; i++) {
                // Push object into records array.
                recs.push({
                    'date': this.cleanupDate(String(jsonresponse[i].date)),
                    'deathstoday': jsonresponse[i].deathIncrease,
                    'deathstotal': jsonresponse[i].death
                });
            }
            // Set state (loading => loaded and fill up records).
            this.setState({
                loading: false,
                records: recs
            })
        } else {
            alert(`Something went wrong, status ${response.status}.`);
            return;
        }
    }

    // If component rendered.
    componentDidMount = async () => {
        // Await fetch and rerender.
        await this.fetchRecords();
    }

    fillPicker = () => {
        const pickerItems = [];
        for (let i = 0; i < stateOptions.length; i++) {
            pickerItems.push(
                <Picker.Item key={i} label={stateOptions[i].label} value={stateOptions[i].value}></Picker.Item>
            )
        }
        return pickerItems;
    }

    handleValueChange = (itemValue, itemIndex) => {
        this.setState({
            loading: true,
            val: itemValue,
            lbl: stateOptions[itemIndex].label
        }, this.fetchRecords)
    }

    render() {
        // If loading return loadscreen.
        if (this.state.loading) {
            return (
                <View>
                    <Text>Loading</Text>
                </View>
            )
        }

        const NUM_CHARTRECORDS = 5;
        const NUM_TABLERECORDS = 50; // Number of records (to display in table).

        // JSX to return on render.
        return (
            <ScrollView>
                <View>
                    <Picker
                        selectedValue={this.state.val}
                        style={{ height: 50, width: Dimensions.get("window").width - 40 }}
                        onValueChange={(iVal, iIndex) => this.handleValueChange(iVal, iIndex)}>
                        {this.fillPicker()}
                    </Picker>
                </View>
                <View>
                    <View>
                        <Text>Covid-19 death records for {this.state.lbl} (last {NUM_CHARTRECORDS} days)</Text>
                        <RecordsChart rcrds={this.state.records} num_rcrds={NUM_CHARTRECORDS}></RecordsChart>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text>Last {NUM_TABLERECORDS} day details table ({this.state.lbl})</Text>
                        <View style={{ marginTop: 8 }}>
                            <RecordsTable rcrds={this.state.records} num_rcrds={NUM_TABLERECORDS}></RecordsTable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default FetchAndDisplay
