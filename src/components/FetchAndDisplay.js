import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import RecordsTable from './RecordsTable';

export class FetchAndDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            records: [],
            val: 'ny', // Initial fetch for ny.
            lbl: 'New York'
        }
    }

    // Function to clean date format (yyyymmdd to dd-mm-yyyy).
    cleanupDate(d) {
        return d.slice(6) + '/' + d.slice(4, 6) + '/' + d.slice(0, 4);
    }

    // Fetch records.
    fetchRecords = async () => {
        let response;

        // Check props for location scope (total US or single state).
        if (this.props.scope === 'total') {
            response = await fetch("https://api.covidtracking.com/v1/us/daily.json");
        } else if (this.props.scope === 'state') {
            response = await fetch(`https://api.covidtracking.com/v1/states/${this.state.val}/daily.json`);
        } else {
            alert('Something went wrong.');
        }

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

    // If props change when rendering component.
    componentDidUpdate = async (prevProps) => {
        // Compare previous props to this.props.
        if (prevProps.scope !== this.props.scope) {
            await this.fetchRecords(); // Fetch records if changed.
        }
    }

    // If component rendered.
    componentDidMount = async () => {
        // Await fetch and rerender.
        await this.fetchRecords();
    }

    // Handle select onChange (don't setState directly in render method).
    handleChange = async (event) => {
        this.setState({
            loading: true, // Loading new data.
            val: event.value,
            lbl: event.label
        }, await this.fetchRecords) // Callback to fetchRecords.
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

        const NUM_RECORDS = 50; // Number of records (to display in table).

        // JSX to return on render.
        return (
            <View>
                <View>
                    {this.props.scope === 'state' ? (
                        <View>
                            <View>
                                <Select
                                    placeholder="Select state"
                                    options={['this', 'that']} // Give options.
                                    onChange={this.handleChange}
                                ></Select>
                            </View>
                        </View>
                    ) : (
                            <View></View>
                        )}
                </View>
                <View>
                    <View>
                        <View>
                            {this.props.scope === 'state' ? (
                                <Text>Covid-19 death records for {this.state.lbl}</Text>
                            ) : (
                                    <Text>Covid-19 death records for all states</Text>
                                )
                            }
                        </View>
                    </View>
                    <View>
                        <View>
                            {this.props.scope === 'state' ? (
                                <Text>Last {NUM_RECORDS} day details table ({this.state.lbl})</Text>
                            ) : (
                                    <Text>Last {NUM_RECORDS} day details table (all states)</Text>
                                )}
                        </View>
                        <RecordsTable rcrds={this.state.records} num_rcrds={NUM_RECORDS}></RecordsTable>
                    </View>
                </View>
            </View>
        )
    }
}

export default FetchAndDisplay
