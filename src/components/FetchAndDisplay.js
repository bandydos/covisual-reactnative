import React, { Component } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RecordsTable from './RecordsTable';
import stateOptions from '../data/stateOptions';
import RecordsChart from './RecordsChart';

export class FetchAndDisplay extends Component {
    constructor(props) {
        super(props);

        this.constvals = {
            num_chartrecords: 5,
            num_tablerecords: 50
        }

        this.state = {
            loading: true,
            records: [],
            xdates: [],
            ydeathstoday: [],
            ydeathstotal: [],
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
        // Check props for location scope (total US or single state).
        const response = await fetch(`https://api.covidtracking.com/v1/states/${this.state.val}/daily.json`);
        const jsonresponse = await response.json(); // Await as json.

        const recs = []; // Records array.

        // X and Y values for chart.
        const xds = []; // X dates.
        const ydtods = []; // Y deaths today.
        const ydtots = []; // Y deaths total.

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
            // Loop inverted for chart.
            for (let i = this.constvals.num_chartrecords; i >= 0; i--) {
                // Start pushing from first death.
                if (recs[i].deathstotal > 0) {
                    xds.push(recs[i].date);
                    ydtods.push(recs[i].deathstoday);
                    ydtots.push(recs[i].deathstotal);
                }
            }
            // Set state (loading => loaded and fill up records and xs and ys).
            this.setState({
                loading: false,
                records: recs,
                xdates: xds,
                ydeathstoday: ydtods,
                ydeathstotal: ydtots
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

    // Fill picker with options (items).
    fillPicker = () => {
        const pickerItems = [];
        for (let i = 0; i < stateOptions.length; i++) {
            pickerItems.push(
                <Picker.Item key={i} label={stateOptions[i].label} value={stateOptions[i].value}></Picker.Item>
            )
        }
        return pickerItems;
    }

    // Handle picker valueChange.
    handleValueChange = (itemValue, itemIndex) => {
        this.setState({
            loading: true, // Restart loading and fill vals.
            val: itemValue,
            lbl: stateOptions[itemIndex].label
        }, this.fetchRecords) // Callback fetch.
    }

    render() {
        // If loading return loadscreen.
        if (this.state.loading) {
            return (
                <View>
                    <Text>Fetching records for {this.state.lbl}...</Text>
                </View>
            )
        }

        // JSX to return on render.
        return (
            <ScrollView>
                <View style={{ alignItems: "center" }}>
                    <Picker
                        selectedValue={this.state.val}
                        style={{ height: 50, width: Dimensions.get("window").width - 40 }}
                        onValueChange={(iVal, iIndex) => this.handleValueChange(iVal, iIndex)}>
                        {this.fillPicker()}
                    </Picker>
                </View>
                <View style={{ marginTop: 12 }}>
                    <Text>Covid-19 death records for {this.state.lbl} (last {this.constvals.num_chartrecords} days)</Text>
                    <RecordsChart xs={this.state.xdates} ys={this.state.ydeathstotal}></RecordsChart>
                    <Text>Deaths / day</Text>
                    <RecordsChart xs={this.state.xdates} ys={this.state.ydeathstoday}></RecordsChart>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text>Last {this.constvals.num_tablerecords} day details table ({this.state.lbl})</Text>
                    <View style={{ marginTop: 8 }}>
                        <RecordsTable rcrds={this.state.records} num_rcrds={this.constvals.num_tablerecords}></RecordsTable>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default FetchAndDisplay