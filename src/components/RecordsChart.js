import { View } from 'native-base';
import { Dimensions } from 'react-native';
import React, { Component } from 'react'
import { LineChart } from 'react-native-chart-kit';

export class RecordsChart extends Component {
    render() {
        const { xs, ys } = this.props; // Destructure xs and ys from props.

        return (
            <View>
                <LineChart
                    data={{
                        labels: xs, // X labels.
                        datasets: [
                            {
                                data: ys // Y labels.
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width - 40} // from react-native
                    height={220}
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 0,
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
