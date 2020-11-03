import { View } from 'native-base';
import {Dimensions } from 'react-native';
import React, { Component } from 'react'
import { LineChart } from 'react-native-chart-kit';

export class RecordsChart extends Component {
    render() {
         const { rcrds } = this.props; // Destructure rcrds from props.

        // X and Y labels for chart.
        const xdates = [];
        const ydeathstoday = [];
        const ydeathstotal = [];

        const tenp = rcrds.length / rcrds.length * 10;

        // Loop inverted.
        for (let i = rcrds.length - 1; i >= 0; i--) {
            // Start pushing from first death.
            if (rcrds[i].deathstotal > 0) {
                xdates.push(rcrds[i].date);
                ydeathstoday.push(rcrds[i].deathstoday);
                ydeathstotal.push(rcrds[i].deathstotal);
            }
        }

        return (
            <View>
                <LineChart
                    data={{
                        labels: xdates,
                        datasets: [
                            {
                                data: ydeathstotal
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
        )
    }
}

export default RecordsChart
